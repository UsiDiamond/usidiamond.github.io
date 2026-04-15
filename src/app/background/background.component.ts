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

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}

vec2 cmul(vec2 a, vec2 b){return vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x);}

float glyph(vec2 cell, vec2 uv){
  float seed = hash(cell + floor(u_t*3.0));
  vec2 g = floor(uv * 5.0);
  if(g.x < 0.0 || g.y < 0.0 || g.x > 4.0 || g.y > 4.0) return 0.0;
  float bit = hash(cell*0.31 + g*0.07 + seed);
  return step(0.55, bit);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy*2.0 - u_res) / u_res.y;

  float r = length(p);
  float theta = atan(p.y, p.x) + u_t*0.05 + r*0.6;
  vec2 z = vec2(cos(theta), sin(theta)) * pow(r, 0.85);

  z = cmul(z, vec2(cos(u_t*0.03), sin(u_t*0.03)));

  vec2 w = (z + 1.2) * vec2(0.5, 0.5);

  float cols = 42.0;
  float rows = 60.0;
  vec2 grid = w * vec2(cols, rows);
  vec2 cellId = floor(grid);
  vec2 cellUV = fract(grid);

  float h = hash(vec2(cellId.x, 17.0));
  float speed = 2.5 + h*6.0;
  float phase = h*100.0;
  float head = u_t*speed + phase;
  float trail = head - cellId.y;

  float inTrail = step(0.0, trail) * step(trail, 18.0);
  float fade = exp(-trail*0.18) * inTrail;
  float flicker = 0.55 + 0.45*hash(cellId + floor(u_t*6.0));

  float g = glyph(cellId, cellUV) * (fade*flicker);

  float edge = smoothstep(0.0, 0.02, cellUV.x)
             * smoothstep(1.0, 0.98, cellUV.x)
             * smoothstep(0.0, 0.02, cellUV.y)
             * smoothstep(1.0, 0.98, cellUV.y);
  g *= edge;

  vec3 bg = mix(vec3(0.04,0.03,0.06), vec3(0.12,0.07,0.18), pow(r, 1.2));
  vec3 trailCol = vec3(0.710, 0.435, 0.847);
  vec3 headCol = vec3(0.95, 0.85, 1.0);
  float isHead = smoothstep(1.0, 0.0, trail);
  vec3 glyphCol = mix(trailCol, headCol, isHead);

  vec3 c = bg;
  c += glyphCol * g * 1.25;

  float ring = abs(fract(r*3.0 - u_t*0.2) - 0.5);
  c += vec3(0.4, 0.25, 0.65) * smoothstep(0.48, 0.5, ring) * 0.12 * exp(-r*0.8);

  c *= mix(0.6, 1.0, smoothstep(1.4, 0.2, r));

  gl_FragColor = vec4(c, 1.0);
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
