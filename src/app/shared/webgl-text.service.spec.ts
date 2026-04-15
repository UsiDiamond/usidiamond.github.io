import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { WebglTextService } from './webgl-text.service';

describe('WebglTextService isEligible', () => {
  let service: WebglTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WebglTextService,
        { provide: Router, useValue: { events: of() } },
      ],
    });
    service = TestBed.inject(WebglTextService);
  });

  afterEach(() => {
    document.body.querySelectorAll('[data-test-heading]').forEach((n) => n.remove());
  });

  function makeHeading(inner: string, opts?: { maxWidth?: string }): HTMLElement {
    const h = document.createElement('h2');
    h.setAttribute('data-test-heading', '');
    h.innerHTML = inner;
    if (opts?.maxWidth) h.style.maxWidth = opts.maxWidth;
    document.body.appendChild(h);
    return h;
  }

  it('accepts a short single-line heading with only text content', () => {
    const h = makeHeading('Education');
    expect(service.isEligible(h)).toBe(true);
  });

  it('rejects an empty heading', () => {
    const h = makeHeading('   ');
    expect(service.isEligible(h)).toBe(false);
  });

  it('accepts a heading containing a <br> tag (multi-line supported)', () => {
    const h = makeHeading('Line one<br>Line two');
    expect(service.isEligible(h)).toBe(true);
  });

  it('rejects a heading containing a child element', () => {
    const h = makeHeading('<span>wrapped</span>');
    expect(service.isEligible(h)).toBe(false);
  });

  it('accepts a long heading that visually wraps (multi-line supported)', () => {
    const h = makeHeading(
      'A sufficiently long heading string that will definitely wrap onto multiple visual lines',
      { maxWidth: '120px' },
    );
    expect(service.isEligible(h)).toBe(true);
  });

  it('rejects when any ancestor has data-no-webgl-text', () => {
    const wrap = document.createElement('div');
    wrap.setAttribute('data-no-webgl-text', '');
    wrap.setAttribute('data-test-heading', '');
    const h = document.createElement('h2');
    h.textContent = 'Skipped';
    wrap.appendChild(h);
    document.body.appendChild(wrap);
    expect(service.isEligible(h)).toBe(false);
  });
});
