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
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.02;a*=.5;}
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  vec2 p=(gl_FragCoord.xy*2.-u_res)/min(u_res.x,u_res.y);

  vec2 q=vec2(fbm(p*1.1+vec2(0,u_t*.03)),fbm(p*1.1+vec2(5.2,u_t*.04)));
  float mist=fbm(p*1.5+q*2.2+vec2(u_t*.02,-u_t*.015));

  vec2 gp=p*3.4+u_t*.02;
  vec2 g=abs(fract(gp)-.5);
  float lat=smoothstep(.02,0.,min(g.x,g.y));
  vec2 rg=abs(fract(mat2(.7071,-.7071,.7071,.7071)*gp*.6)-.5);
  float lat2=smoothstep(.015,0.,min(rg.x,rg.y));

  vec3 c=vec3(.278);
  c=mix(c,vec3(.42),smoothstep(.2,.7,mist)*.55);
  c=mix(c,vec3(.71,.435,.847),smoothstep(.4,.85,mist)*.45);
  c=mix(c,vec3(.267,.447,.494),smoothstep(.55,.95,mist)*.28);
  c*=mix(.65,1.,smoothstep(1.35,.25,length(uv-.5)*1.9));
  c+=vec3(.871,.733,1.)*lat*.18;
  c+=vec3(.71,.435,.847)*lat2*.1;

  gl_FragColor=vec4(c,1.);
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
