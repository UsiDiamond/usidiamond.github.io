import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

const VERTEX_SHADER = `#version 100
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 100
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),             hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * valueNoise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // -- Mist: domain-warped fBm ------------------------------------------------
  vec2 q = vec2(
    fbm(p * 1.1 + vec2(0.0, u_time * 0.03)),
    fbm(p * 1.1 + vec2(5.2, u_time * 0.04))
  );
  float mist = fbm(p * 1.5 + q * 2.2 + vec2(u_time * 0.02, -u_time * 0.015));

  // -- Lattice: soft grid lines with slow drift ------------------------------
  vec2 gridP = p * 3.4 + vec2(u_time * 0.02, u_time * 0.015);
  vec2 g = abs(fract(gridP) - 0.5);
  float d = min(g.x, g.y);
  float lattice = smoothstep(0.02, 0.0, d);

  // Secondary lattice at 45deg for cross-hatch depth
  vec2 r = mat2(0.7071, -0.7071, 0.7071, 0.7071) * gridP;
  vec2 rg = abs(fract(r * 0.6) - 0.5);
  float rlattice = smoothstep(0.015, 0.0, min(rg.x, rg.y));

  // -- Palette (matches site tokens) ------------------------------------------
  vec3 charcoal = vec3(0.278, 0.278, 0.278);
  vec3 slate    = vec3(0.420, 0.420, 0.420);
  vec3 purple   = vec3(0.710, 0.435, 0.847);
  vec3 teal     = vec3(0.267, 0.447, 0.494);
  vec3 lavender = vec3(0.871, 0.733, 1.000);

  vec3 col = charcoal;
  col = mix(col, slate,  smoothstep(0.2, 0.7, mist) * 0.55);
  col = mix(col, purple, smoothstep(0.4, 0.85, mist) * 0.45);
  col = mix(col, teal,   smoothstep(0.55, 0.95, mist) * 0.28);

  // Vignette darkens edges so cards have contrast against the middle glow
  float vignette = smoothstep(1.35, 0.25, length(uv - 0.5) * 1.9);
  col *= mix(0.65, 1.0, vignette);

  col += lavender * lattice * 0.18;
  col += purple   * rlattice * 0.10;

  gl_FragColor = vec4(col, 1.0);
}`;

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
  standalone: false,
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private rafId = 0;
  private startTime = performance.now();
  private resizeObserver?: ResizeObserver;
  private motionQuery?: MediaQueryList;
  private motionListener?: (e: MediaQueryListEvent) => void;
  private uResolution: WebGLUniformLocation | null = null;
  private uTime: WebGLUniformLocation | null = null;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const gl =
      canvas.getContext('webgl', { antialias: false, depth: false }) ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
                  return;
    }
    this.gl = gl;

    const program = this.buildProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    if (!program) return;
    this.program = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    this.uResolution = gl.getUniformLocation(program, 'u_resolution');
    this.uTime = gl.getUniformLocation(program, 'u_time');
    gl.useProgram(program);

    this.resize();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(canvas);
    } else {
      window.addEventListener('resize', this.resize);
    }

    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.motionListener = () => {
      cancelAnimationFrame(this.rafId);
      if (!this.motionQuery?.matches) this.startLoop();
      else this.renderFrame(0);     };
    this.motionQuery.addEventListener?.('change', this.motionListener);

    if (this.motionQuery.matches) {
      this.renderFrame(0);
    } else {
      this.startLoop();
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.resize);
    if (this.motionQuery && this.motionListener) {
      this.motionQuery.removeEventListener?.('change', this.motionListener);
    }
  }

  private startLoop(): void {
            this.zone.runOutsideAngular(() => {
      const tick = () => {
        const t = (performance.now() - this.startTime) / 1000;
        this.renderFrame(t);
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    });
  }

  private renderFrame(timeSec: number): void {
    const gl = this.gl;
    if (!gl || !this.program) return;
    gl.uniform1f(this.uTime, timeSec);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private resize = (): void => {
    const gl = this.gl;
    const canvas = this.canvasRef?.nativeElement;
    if (!gl || !canvas) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(this.uResolution, w, h);
    this.renderFrame((performance.now() - this.startTime) / 1000);
  };

  private buildProgram(
    gl: WebGLRenderingContext,
    vsSource: string,
    fsSource: string,
  ): WebGLProgram | null {
    const compile = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;

    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }
}
