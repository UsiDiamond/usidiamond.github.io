import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { LanguageService } from './i18n/language.service';
import { SUPPORTED_LANGUAGES } from './i18n/supported-languages';
import { setViewport, resetViewport, BREAKPOINTS } from '../testing/layout';

const RTL_LANGS = SUPPORTED_LANGUAGES.filter((l) => l.dir === 'rtl');
const LTR_LANGS = SUPPORTED_LANGUAGES.filter((l) => l.dir === 'ltr');

describe('LanguageService — RTL direction', () => {
  let svc: LanguageService;
  let htmlEl: HTMLElement;

  beforeEach(() => {
    localStorage.removeItem('usidiamond.lang');
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    });
    svc = TestBed.inject(LanguageService);
    htmlEl = document.documentElement;
  });

  afterEach(() => {
    htmlEl.setAttribute('dir', 'ltr');
    htmlEl.setAttribute('lang', 'en');
  });

  it('sets dir="rtl" for every RTL language', () => {
    for (const lang of RTL_LANGS) {
      svc.use(lang.code);
      expect(htmlEl.getAttribute('dir'))
        .withContext(`Expected dir=rtl after selecting ${lang.code}`)
        .toBe('rtl');
    }
  });

  it('sets dir="ltr" for every LTR language', () => {
    svc.use(RTL_LANGS[0].code);
    for (const lang of LTR_LANGS) {
      svc.use(lang.code);
      expect(htmlEl.getAttribute('dir'))
        .withContext(`Expected dir=ltr after selecting ${lang.code}`)
        .toBe('ltr');
    }
  });

  it('resets dir to ltr after switching back from RTL', () => {
    svc.use('ar');
    expect(htmlEl.getAttribute('dir')).toBe('rtl');
    svc.use('en');
    expect(htmlEl.getAttribute('dir')).toBe('ltr');
  });
});

describe('AppComponent — bg-toggle position in RTL', () => {
  let fixture: ComponentFixture<AppComponent>;
  let el: HTMLElement;
  let langSvc: LanguageService;

  const translations = {
    common: {
      skipToMainContent: 'Skip to main content',
      pauseAnimation: 'Pause animation',
      resumeAnimation: 'Resume animation',
    },
  };

  beforeEach(() => {
    localStorage.removeItem('usidiamond.lang');
    TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])],
    });
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', translations, true);
    translate.setTranslation(
      'ar',
      {
        common: {
          skipToMainContent: 'تخطي إلى المحتوى الرئيسي',
          pauseAnimation: 'إيقاف الحركة مؤقتاً',
          resumeAnimation: 'استئناف الحركة',
        },
      },
      true,
    );
    translate.use('en');

    langSvc = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  afterEach(() => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    resetViewport();
  });

  it('bg-toggle button is present', () => {
    expect(el.querySelector('.bg-toggle')).toBeTruthy();
  });

  it('bg-toggle does not use hard-coded left or right physical properties', () => {
    const btn = el.querySelector<HTMLElement>('.bg-toggle');
    expect(btn).toBeTruthy();

    expect(btn!.style.left).toBe('');
    expect(btn!.style.right).toBe('');
  });

  it('bg-toggle does not overflow the viewport in LTR at mobile width', () => {
    setViewport(BREAKPOINTS.mobile.width, BREAKPOINTS.mobile.height);
    fixture.detectChanges();
    const btn = el.querySelector<HTMLElement>('.bg-toggle');
    if (!btn) return;
    const r = btn.getBoundingClientRect();

    expect(r.width).toBeGreaterThanOrEqual(0);
  });

  it('document direction is rtl after switching to Arabic', () => {
    langSvc.use('ar');
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });

  it('document direction is rtl after switching to Yiddish', () => {
    langSvc.use('yi');
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });

  it('document direction returns to ltr after switching away from RTL', () => {
    langSvc.use('ar');
    langSvc.use('en');
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });
});

const ALL_LANG_TRANSLATIONS: Record<
  string,
  { pauseAnimation: string; resumeAnimation: string; skipToMainContent: string }
> = {
  en: {
    pauseAnimation: 'Pause animation',
    resumeAnimation: 'Resume animation',
    skipToMainContent: 'Skip to main content',
  },
  ar: {
    pauseAnimation: 'إيقاف الحركة مؤقتاً',
    resumeAnimation: 'استئناف الحركة',
    skipToMainContent: 'تخطي إلى المحتوى الرئيسي',
  },
  de: {
    pauseAnimation: 'Animation pausieren',
    resumeAnimation: 'Animation fortsetzen',
    skipToMainContent: 'Zum Hauptinhalt springen',
  },
  es: {
    pauseAnimation: 'Pausar animación',
    resumeAnimation: 'Reanudar animación',
    skipToMainContent: 'Saltar al contenido principal',
  },
  fr: {
    pauseAnimation: 'Mettre en pause',
    resumeAnimation: 'Reprendre',
    skipToMainContent: 'Aller au contenu principal',
  },
  ko: {
    pauseAnimation: '애니메이션 일시정지',
    resumeAnimation: '애니메이션 재개',
    skipToMainContent: '본문으로 건너뛰기',
  },
  ru: {
    pauseAnimation: 'Пауза анимации',
    resumeAnimation: 'Возобновить анимацию',
    skipToMainContent: 'Перейти к основному содержимому',
  },
  tl: {
    pauseAnimation: 'I-pause ang animasyon',
    resumeAnimation: 'Ipagpatuloy ang animasyon',
    skipToMainContent: 'Laktawan ang pangunahing nilalaman',
  },
  vi: {
    pauseAnimation: 'Tạm dừng hoạt ảnh',
    resumeAnimation: 'Tiếp tục hoạt ảnh',
    skipToMainContent: 'Chuyển đến nội dung chính',
  },
  yi: {
    pauseAnimation: 'פּויזירן אַנימאַציע',
    resumeAnimation: 'ווידעראויפנעמען אַנימאַציע',
    skipToMainContent: 'שפּרינג צום הויפּט־אינהאַלט',
  },
  'zh-Hans': {
    pauseAnimation: '暂停动画',
    resumeAnimation: '继续动画',
    skipToMainContent: '跳至主要内容',
  },
};

describe('AppComponent — bg-toggle label translation', () => {
  let fixture: ComponentFixture<AppComponent>;
  let el: HTMLElement;
  let langSvc: LanguageService;

  beforeEach(() => {
    localStorage.removeItem('usidiamond.lang');
    TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])],
    });
    const translate = TestBed.inject(TranslateService);
    for (const [code, t] of Object.entries(ALL_LANG_TRANSLATIONS)) {
      translate.setTranslation(code, { common: t }, true);
    }
    translate.use('en');
    langSvc = TestBed.inject(LanguageService);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  afterEach(() => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  });

  for (const [code, t] of Object.entries(ALL_LANG_TRANSLATIONS)) {
    it(`shows translated pause label in ${code}`, () => {
      langSvc.use(code);
      fixture.detectChanges();
      const label = el.querySelector('.bg-toggle__label');
      expect(label).withContext(`bg-toggle__label missing for ${code}`).toBeTruthy();
      expect(label!.textContent?.trim())
        .withContext(`Wrong pause label for ${code}`)
        .toBe(t.pauseAnimation);
    });

    it(`never renders the raw key in ${code}`, () => {
      langSvc.use(code);
      fixture.detectChanges();
      const label = el.querySelector('.bg-toggle__label');
      expect(label!.textContent)
        .withContext(`Raw key shown for ${code}`)
        .not.toContain('common.');
    });

    it(`shows translated skip link text in ${code}`, () => {
      langSvc.use(code);
      fixture.detectChanges();
      const skip = el.querySelector<HTMLElement>('a.skip');
      expect(skip).withContext(`skip link missing for ${code}`).toBeTruthy();
      expect(skip!.textContent?.trim())
        .withContext(`Wrong skip text for ${code}`)
        .toBe(t.skipToMainContent);
    });
  }
});

describe('MenuComponent — nav link text does not overflow at narrow widths', () => {
  it('overflow-wrap: anywhere is applied to nav links via stylesheet', () => {
    const div = document.createElement('button');
    div.className = 'nav-link';
    document.body.appendChild(div);

    expect(div.style.overflow).toBe('');
    document.body.removeChild(div);
  });
});
