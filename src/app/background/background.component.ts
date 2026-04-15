import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

const VS = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FS = `precision highp float;
uniform vec2 u_res;
uniform float u_t;

#define ITER 14
#define VOLSTEPS 16
#define FORMUPARAM 0.53
#define STEPSIZE 0.1
#define ZOOM 0.8
#define TILE 0.85
#define SPEED 0.006
#define BRIGHTNESS 0.0015
#define DARKMATTER 0.30
#define DISTFADING 0.73
#define SATURATION 0.85

void main(){
  vec2 uv = gl_FragCoord.xy / u_res - 0.5;
  uv.y *= u_res.y / u_res.x;
  vec3 dir = vec3(uv * ZOOM, 1.0);
  float time = u_t * SPEED + 0.25;

  float a1 = 0.5 + 0.18 * sin(u_t * 0.07);
  float a2 = 0.8 + 0.14 * cos(u_t * 0.09);
  mat2 rot1 = mat2(cos(a1), sin(a1), -sin(a1), cos(a1));
  mat2 rot2 = mat2(cos(a2), sin(a2), -sin(a2), cos(a2));
  dir.xz *= rot1;
  dir.xy *= rot2;

  vec3 from = vec3(1.0, 0.5, 0.5);
  from += vec3(time * 2.0, time, -2.0);
  from.xz *= rot1;
  from.xy *= rot2;

  float s = 0.1, fade = 1.0;
  vec3 v = vec3(0.0);
  for(int r = 0; r < VOLSTEPS; r++){
    vec3 p = from + s * dir * 0.5;
    p = abs(vec3(TILE) - mod(p, vec3(TILE * 2.0)));
    float pa = 0.0, a = 0.0;
    for(int i = 0; i < ITER; i++){
      p = abs(p) / dot(p, p) - FORMUPARAM;
      a += abs(length(p) - pa);
      pa = length(p);
    }
    float dm = max(0.0, DARKMATTER - a * a * 0.001);
    a = a * a * a;
    if(r > 6) fade *= 1.0 - dm;
    v += fade;
    v += vec3(s, s * s, s * s * s * s) * a * BRIGHTNESS * fade;
    fade *= DISTFADING;
    s += STEPSIZE;
  }
  v = mix(vec3(length(v)), v, SATURATION);
  v *= vec3(0.9, 0.75, 1.05);
  gl_FragColor = vec4(v * 0.01, 1.0);
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

  private gl!: WebGLRenderingContext;
  private uRes!: WebGLUniformLocation;
  private uTime!: WebGLUniformLocation;
  private raf = 0;
  private start = performance.now();
  private ro?: ResizeObserver;
  private motion?: MediaQueryList;
  private onMotion = () => this.tick();

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const gl = canvas.getContext('webgl', { antialias: false, depth: false });
    if (!gl) return;
    this.gl = gl;

    const program = this.compile(VS, FS);
    if (!program) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);
    this.uRes = gl.getUniformLocation(program, 'u_res')!;
    this.uTime = gl.getUniformLocation(program, 'u_t')!;

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    this.motion = matchMedia('(prefers-reduced-motion: reduce)');
    this.motion.addEventListener('change', this.onMotion);

    this.resize();
    this.tick();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    this.motion?.removeEventListener('change', this.onMotion);
  }

  private tick(): void {
    cancelAnimationFrame(this.raf);
    this.render();
    if (this.motion?.matches) return;
    this.zone.runOutsideAngular(() => {
      const loop = () => {
        this.render();
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    });
  }

  private render(): void {
    this.gl.uniform1f(this.uTime, (performance.now() - this.start) / 1000);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      this.gl.viewport(0, 0, w, h);
    }
    this.gl.uniform2f(this.uRes, w, h);
    this.render();
  }

  private compile(vs: string, fs: string): WebGLProgram | null {
    const gl = this.gl;
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const v = shader(gl.VERTEX_SHADER, vs);
    const f = shader(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    const p = gl.createProgram()!;
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  }
}
