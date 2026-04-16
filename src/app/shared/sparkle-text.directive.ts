import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
} from '@angular/core';

const VS = `attribute vec2 a;varying vec2 v;void main(){v=(a+1.)*.5;gl_Position=vec4(a,0.,1.);}`;

const FS = `precision highp float;
varying vec2 v;
uniform float u_t;
uniform sampler2D u_mask;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){
  vec2 i = floor(p), f = fract(p), u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}

void main(){
  vec4 mask = texture2D(u_mask, vec2(v.x, 1.0 - v.y));
  if(mask.a < 0.01) discard;
  float noise = n(v * 4.0 + vec2(u_t * 0.25, -u_t * 0.18));
  float wave = 0.5 + 0.5 * sin(v.x * 3.2 + u_t * 1.1 + noise * 1.4);
  vec3 col = mix(vec3(0.87, 0.73, 1.00), vec3(0.71, 0.44, 0.85), smoothstep(0.2, 0.7, wave));
  col = mix(col, vec3(0.56, 0.28, 0.98), smoothstep(0.6, 1.0, wave) * 0.7);
  float shimmer = pow(smoothstep(0.82, 1.0, wave), 3.0) * 0.55;
  col += vec3(1.0) * shimmer;

  float pulse = 0.85 + 0.15 * sin(u_t * 2.0);
  col *= pulse;

  float sparkle = pow(n(v * 18.0 + u_t * 0.5), 12.0) * 1.8;
  col += vec3(1.0, 0.9, 1.0) * sparkle * mask.a;

  float edgeGlow = smoothstep(0.5, 0.01, mask.a) * mask.a * 0.35;
  col += vec3(0.80, 0.60, 1.0) * edgeGlow;

  gl_FragColor = vec4(col * mask.a, mask.a);
}`;

@Directive({
  selector: '[sparkle]',
  standalone: false,
})
export class SparkleTextDirective implements AfterViewInit, OnDestroy {
  private canvas?: HTMLCanvasElement;
  private gl?: WebGLRenderingContext;
  private tex?: WebGLTexture;
  private uTime: WebGLUniformLocation | null = null;
  private raf = 0;
  private start = performance.now();
  private ro?: ResizeObserver;
  private motion?: MediaQueryList;
  private onMotion = () => this.syncState();
  private prevColor = '';
  private prevPosition = '';

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private zone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    const host = this.hostRef.nativeElement;
    const text = (host.textContent || '').trim();
    if (!text) return;

    this.motion = matchMedia('(prefers-reduced-motion: reduce)');
    if (this.motion.matches) return;
    this.motion.addEventListener('change', this.onMotion);

    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('aria-hidden', 'true');
    Object.assign(this.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    });

    const gl = this.canvas.getContext('webgl', {
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return;
    this.gl = gl;

    const program = this.compile(gl);
    if (!program) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

    this.tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(gl.getUniformLocation(program, 'u_mask'), 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    this.uTime = gl.getUniformLocation(program, 'u_t');

    this.prevColor = host.style.color;
    this.prevPosition = host.style.position;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.style.color = 'transparent';
    host.appendChild(this.canvas);

    this.ro = new ResizeObserver(() => this.refresh());
    this.ro.observe(host);

    this.refresh();
    this.syncState();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    this.motion?.removeEventListener('change', this.onMotion);
    const host = this.hostRef.nativeElement;
    if (this.canvas?.parentElement === host) host.removeChild(this.canvas);
    host.style.color = this.prevColor;
    host.style.position = this.prevPosition;
  }

  private syncState(): void {
    cancelAnimationFrame(this.raf);
    if (this.motion?.matches) {
      const host = this.hostRef.nativeElement;
      if (this.canvas?.parentElement === host) host.removeChild(this.canvas);
      host.style.color = this.prevColor;
      host.style.position = this.prevPosition;
      return;
    }
    this.render();
    this.zone.runOutsideAngular(() => {
      const loop = () => {
        this.render();
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    });
  }

  private render(): void {
    if (!this.gl) return;
    if (this.uTime) this.gl.uniform1f(this.uTime, (performance.now() - this.start) / 1000);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }

  private refresh(): void {
    const host = this.hostRef.nativeElement;
    const canvas = this.canvas;
    const gl = this.gl;
    const tex = this.tex;
    if (!canvas || !gl || !tex) return;

    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (w <= 1 || h <= 1) return;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }

    const styles = getComputedStyle(host);
    const lines: string[] = [];
    let buf = '';
    for (const node of Array.from(host.childNodes)) {
      if (node === canvas) continue;
      if (node.nodeName === 'BR') {
        if (buf.trim()) lines.push(buf.trim());
        buf = '';
      } else {
        buf += node.textContent || '';
      }
    }
    if (buf.trim()) lines.push(buf.trim());
    if (!lines.length) return;

    const mask = document.createElement('canvas');
    mask.width = w;
    mask.height = h;
    const ctx = mask.getContext('2d')!;
    ctx.scale(dpr, dpr);
    ctx.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const cx = rect.width / 2;
    const lineHeight = rect.height / lines.length;
    lines.forEach((line, i) => ctx.fillText(line, cx, lineHeight * (i + 0.5)));

    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mask);
  }

  private compile(gl: WebGLRenderingContext): WebGLProgram | null {
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = shader(gl.VERTEX_SHADER, VS);
    const fs = shader(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return null;
    const p = gl.createProgram()!;
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  }
}
