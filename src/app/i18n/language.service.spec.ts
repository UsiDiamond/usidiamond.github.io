import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { SUPPORTED_LANGUAGES } from './supported-languages';

describe('LanguageService', () => {
  // Freeze navigator to an unsupported language across the top-level suite so
  // "defaults to English" tests aren't perturbed by whatever locale the test
  // browser happens to report. The nested browser-preference describe block
  // overrides this within its own afterEach-bounded scope.
  const savedLanguages = Object.getOwnPropertyDescriptor(
    window.navigator,
    'languages',
  );
  const savedLanguage = Object.getOwnPropertyDescriptor(
    window.navigator,
    'language',
  );

  beforeAll(() => {
    Object.defineProperty(window.navigator, 'languages', {
      configurable: true,
      get: () => ['xx-YY'],
    });
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      get: () => 'xx-YY',
    });
  });

  afterAll(() => {
    if (savedLanguages) {
      Object.defineProperty(window.navigator, 'languages', savedLanguages);
    }
    if (savedLanguage) {
      Object.defineProperty(window.navigator, 'language', savedLanguage);
    }
  });

  beforeEach(() => {
    localStorage.removeItem('usidiamond.lang');
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    });
  });

  it('should register every supported language with the translate service', () => {
    const svc = TestBed.inject(LanguageService);
    const translate = TestBed.inject(TranslateService);
    const langs = translate.getLangs();
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(langs).toContain(lang.code);
    }
    expect(svc.supported.length).toBe(SUPPORTED_LANGUAGES.length);
  });

  it('should default to English when no preference is stored', () => {
    const svc = TestBed.inject(LanguageService);
    expect(svc.current.code).toBe('en');
  });

  it('should apply a stored language on init', () => {
    localStorage.setItem('usidiamond.lang', 'es');
    const svc = TestBed.inject(LanguageService);
    expect(svc.current.code).toBe('es');
  });

  it('use(code) should switch the active language and persist it', () => {
    const svc = TestBed.inject(LanguageService);
    svc.use('fr');
    expect(svc.current.code).toBe('fr');
    expect(localStorage.getItem('usidiamond.lang')).toBe('fr');
  });

  it('use(code) should ignore unsupported codes', () => {
    const svc = TestBed.inject(LanguageService);
    const before = svc.current.code;
    svc.use('zz');
    expect(svc.current.code).toBe(before);
  });

  it('should set <html lang> and <html dir> when the language changes', () => {
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
    const originalLanguages = Object.getOwnPropertyDescriptor(
      window.navigator,
      'languages',
    );
    const originalLanguage = Object.getOwnPropertyDescriptor(
      window.navigator,
      'language',
    );

    function installNavigatorLanguages(...tags: string[]) {
      // Provide both navigator.languages (preference-ordered) and
      // navigator.language (single) so pickInitialLanguage can consult either.
      Object.defineProperty(window.navigator, 'languages', {
        configurable: true,
        get: () => tags,
      });
      Object.defineProperty(window.navigator, 'language', {
        configurable: true,
        get: () => tags[0],
      });
    }

    afterEach(() => {
      // Restore the real navigator properties so these stubs don't leak into
      // the surrounding suite's "defaults to English" expectations.
      if (originalLanguages) {
        Object.defineProperty(
          window.navigator,
          'languages',
          originalLanguages,
        );
      }
      if (originalLanguage) {
        Object.defineProperty(window.navigator, 'language', originalLanguage);
      }
    });

    it('should pick browser exact-match (French fr)', () => {
      installNavigatorLanguages('fr');
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('fr');
    });

    it('should pick base-subtag match (en-GB -> en)', () => {
      installNavigatorLanguages('en-GB');
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('en');
    });

    it('should map zh-CN onto the supported zh-Hans entry', () => {
      installNavigatorLanguages('zh-CN');
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('zh-Hans');
    });

    it('should honour preference order (es-MX before en)', () => {
      installNavigatorLanguages('es-MX', 'en-US');
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('es');
    });

    it('should fall back to English for an unsupported language list', () => {
      installNavigatorLanguages('xx', 'yy');
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('en');
    });

    it('a stored language still wins over the browser preference', () => {
      localStorage.setItem('usidiamond.lang', 'de');
      installNavigatorLanguages('fr', 'es');
      const svc = TestBed.inject(LanguageService);
      expect(svc.current.code).toBe('de');
    });
  });
});
