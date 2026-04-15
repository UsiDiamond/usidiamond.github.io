import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

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
  col += vec3(1.0) * pow(smoothstep(0.82, 1.0, wave), 3.0) * 0.45;
  gl_FragColor = vec4(col * mask.a, mask.a);
}`;

interface Attachment {
  host: HTMLElement;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  tex: WebGLTexture;
  uTime: WebGLUniformLocation | null;
  ro: ResizeObserver;
  mo: MutationObserver;
  prevColor: string;
  prevPosition: string;
  cachedText: string;
}

@Injectable({ providedIn: 'root' })
export class WebglTextService implements OnDestroy {
  private attachments = new Map<HTMLElement, Attachment>();
  private raf = 0;
  private start = performance.now();
  private scanPending = false;
  private navSub?: Subscription;
  private motion = matchMedia('(prefers-reduced-motion: reduce)');

  constructor(
    private zone: NgZone,
    router: Router,
  ) {
    this.navSub = router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.scheduleScan());
    document.addEventListener('DOMContentLoaded', () => this.scheduleScan());
    window.addEventListener('resize', () => this.scheduleScan());
    this.scheduleScan();
    this.zone.runOutsideAngular(() => this.loop());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.navSub?.unsubscribe();
    for (const host of Array.from(this.attachments.keys())) this.detach(host);
  }

  isEligible(host: HTMLElement): boolean {
    if (!(host.textContent || '').trim()) return false;
    if (host.closest('[data-no-webgl-text]')) return false;
    return Array.from(host.childNodes).every(
      (c) => c.nodeType === Node.TEXT_NODE || c.nodeName === 'BR',
    );
  }

  private scheduleScan(): void {
    if (this.scanPending) return;
    this.scanPending = true;
    setTimeout(() => {
      this.scanPending = false;
      this.scan();
    }, 120);
  }

  private scan(): void {
    if (this.motion.matches) return;
    document.querySelectorAll<HTMLElement>('h1, h2').forEach((host) => {
      if (!this.attachments.has(host) && this.isEligible(host))
        this.attach(host);
    });
    for (const [host] of Array.from(this.attachments)) {
      if (!host.isConnected || !this.isEligible(host)) this.detach(host);
    }
  }

  private collectLines(host: HTMLElement): string[] {
    const lines: string[] = [];
    let buf = '';
    for (const node of Array.from(host.childNodes)) {
      if (node.nodeName === 'BR') {
        if (buf.trim()) lines.push(buf.trim());
        buf = '';
      } else {
        buf += node.textContent || '';
      }
    }
    if (buf.trim()) lines.push(buf.trim());
    return lines;
  }

  private attach(host: HTMLElement): void {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    });

    const gl = canvas.getContext('webgl', {
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return;

    const program = this.compile(gl);
    if (!program) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const a = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(gl.getUniformLocation(program, 'u_mask'), 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const prevColor = host.style.color;
    const prevPosition = host.style.position;
    if (getComputedStyle(host).position === 'static')
      host.style.position = 'relative';
    host.style.color = 'transparent';
    host.appendChild(canvas);

    const attachment: Attachment = {
      host,
      canvas,
      gl,
      tex,
      uTime: gl.getUniformLocation(program, 'u_t'),
      ro: new ResizeObserver(() => this.refresh(attachment)),
      mo: new MutationObserver(() => {
        if ((host.textContent || '').trim() !== attachment.cachedText)
          this.refresh(attachment);
      }),
      prevColor,
      prevPosition,
      cachedText: '',
    };
    attachment.ro.observe(host);
    attachment.mo.observe(host, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    this.attachments.set(host, attachment);
    this.refresh(attachment);
  }

  private detach(host: HTMLElement): void {
    const a = this.attachments.get(host);
    if (!a) return;
    a.ro.disconnect();
    a.mo.disconnect();
    a.canvas.remove();
    host.style.color = a.prevColor;
    host.style.position = a.prevPosition;
    this.attachments.delete(host);
  }

  private refresh(a: Attachment): void {
    const rect = a.host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (w <= 1 || h <= 1) return;
    if (a.canvas.width !== w || a.canvas.height !== h) {
      a.canvas.width = w;
      a.canvas.height = h;
      a.gl.viewport(0, 0, w, h);
    }

    const styles = getComputedStyle(a.host);
    const lines = this.collectLines(a.host);
    a.cachedText = lines.join('\n');

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
    const lineHeight = rect.height / Math.max(1, lines.length);
    lines.forEach((line, i) => ctx.fillText(line, cx, lineHeight * (i + 0.5)));

    a.gl.bindTexture(a.gl.TEXTURE_2D, a.tex);
    a.gl.pixelStorei(a.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    a.gl.texImage2D(
      a.gl.TEXTURE_2D,
      0,
      a.gl.RGBA,
      a.gl.RGBA,
      a.gl.UNSIGNED_BYTE,
      mask,
    );
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

  private loop = (): void => {
    const t = (performance.now() - this.start) / 1000;
    for (const a of this.attachments.values()) {
      if (a.uTime) a.gl.uniform1f(a.uTime, t);
      a.gl.clearColor(0, 0, 0, 0);
      a.gl.clear(a.gl.COLOR_BUFFER_BIT);
      a.gl.drawArrays(a.gl.TRIANGLES, 0, 3);
    }
    this.raf = requestAnimationFrame(this.loop);
  };
}
