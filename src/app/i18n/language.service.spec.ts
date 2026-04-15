import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { SUPPORTED_LANGUAGES } from './supported-languages';

/**
 * Builds a Proxy over the real document whose defaultView.navigator reports
 * the given locale(s). All other document methods (querySelectorAll,
 * createElement, etc.) pass through to the real document, which Angular's
 * DOMTestComponentRenderer calls during createComponent.
 *
 * Going through a DI-provided fake Document — instead of poking
 * Object.defineProperty on the real window.navigator — avoids the
 * non-configurable-property headache on the CI Chrome Headless build, where
 * redefining navigator.languages silently loses the override.
 */
function makeFakeDocument(languages: string[]): Document {
  const realDoc = window.document;
  const realWin = window;
  const realNav = realWin.navigator;
  const fakeNavigator = new Proxy(realNav, {
    get(target, prop) {
      if (prop === 'language') return languages[0] ?? '';
      if (prop === 'languages') return languages;
      const val = Reflect.get(target, prop);
      return typeof val === 'function' ? val.bind(target) : val;
    },
  }) as Navigator;
  const fakeWindow = new Proxy(realWin, {
    get(target, prop) {
      if (prop === 'navigator') return fakeNavigator;
      // Always invoke getters with the REAL target as `this` so DOM getters
      // (window.document, etc.) don't throw "Illegal invocation".
      const val = Reflect.get(target, prop, target);
      return typeof val === 'function' ? val.bind(target) : val;
    },
  }) as unknown as Window;
  return new Proxy(realDoc, {
    get(target, prop) {
      if (prop === 'defaultView') return fakeWindow;
      const val = Reflect.get(target, prop, target);
      return typeof val === 'function' ? val.bind(target) : val;
    },
  }) as Document;
}

function configureWith(languages: string[]): void {
  TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()],
    providers: [
      { provide: DOCUMENT, useValue: makeFakeDocument(languages) },
    ],
  });
}

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.removeItem('usidiamond.lang');
  });

  it('should register every supported language with the translate service', () => {
    configureWith(['xx-YY']);
    const svc = TestBed.inject(LanguageService);
    const translate = TestBed.inject(TranslateService);
    const langs = translate.getLangs();
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(langs).toContain(lang.code);
    }
    expect(svc.supported.length).toBe(SUPPORTED_LANGUAGES.length);
  });

  it('should default to English when no preference is stored and browser locale is unsupported', () => {
    configureWith(['xx-YY']);
    const svc = TestBed.inject(LanguageService);
    expect(svc.current.code).toBe('en');
  });

  it('should apply a stored language on init', () => {
    localStorage.setItem('usidiamond.lang', 'es');
    configureWith(['xx-YY']);
    const svc = TestBed.inject(LanguageService);
    expect(svc.current.code).toBe('es');
  });

  it('use(code) should switch the active language and persist it', () => {
    configureWith(['xx-YY']);
    const svc = TestBed.inject(LanguageService);
    svc.use('fr');
    expect(svc.current.code).toBe('fr');
    expect(localStorage.getItem('usidiamond.lang')).toBe('fr');
  });

  it('use(code) should ignore unsupported codes', () => {
    configureWith(['xx-YY']);
    const svc = TestBed.inject(LanguageService);
    const before = svc.current.code;
    svc.use('zz');
    expect(svc.current.code).toBe(before);
  });

  it('should set <html lang> and <html dir> when the language changes', () => {
    configureWith(['xx-YY']);
    const svc = TestBed.inject(LanguageService);
    svc.use('ar');
    const html = document.documentElement;
    expect(html.getAttribute('lang')).toBe('ar');
    expect(html.getAttribute('dir')).toBe('rtl');

    svc.use('en');
    expect(html.getAttribute('lang')).toBe('en');
    expect(html.getAttribute('dir')).toBe('ltr');
  });

  it('current$ should emit the active language', (done) => {
    configureWith(['xx-YY']);
    const svc = TestBed.inject(LanguageService);
    svc.current$.subscribe((lang) => {
      if (lang.code === 'de') {
        expect(lang.nativeName).toBe('Deutsch');
        done();
      }
    });
    svc.use('de');
  });

  describe('browser-preference detection (no stored language)', () => {
    it('should pick browser exact-match (French fr)', () => {
      configureWith(['fr']);
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('fr');
    });

    it('should pick base-subtag match (en-GB -> en)', () => {
      configureWith(['en-GB']);
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('en');
    });

    it('should map zh-CN onto the supported zh-Hans entry', () => {
      configureWith(['zh-CN']);
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('zh-Hans');
    });

    it('should honour preference order (es-MX before en)', () => {
      configureWith(['es-MX', 'en-US']);
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('es');
    });

    it('should fall back to English for an unsupported language list', () => {
      configureWith(['xx', 'yy']);
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('en');
    });

    it('a stored language still wins over the browser preference', () => {
      localStorage.setItem('usidiamond.lang', 'de');
      configureWith(['fr', 'es']);
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('de');
    });
  });
});
