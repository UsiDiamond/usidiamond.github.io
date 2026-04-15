import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { SUPPORTED_LANGUAGES } from './supported-languages';

describe('LanguageService', () => {
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
});
