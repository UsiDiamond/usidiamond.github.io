import { DOCUMENT } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { LanguageService } from '../language.service';
import { SUPPORTED_LANGUAGES } from '../supported-languages';

function makeFakeDocument(): Document {
  const realDoc = window.document;
  const realWin = window;
  const realNav = realWin.navigator;
  const fakeNavigator = new Proxy(realNav, {
    get(target, prop) {
      if (prop === 'language') return 'xx-YY';
      if (prop === 'languages') return ['xx-YY'];
      const val = Reflect.get(target, prop);
      return typeof val === 'function' ? val.bind(target) : val;
    },
  }) as Navigator;
  const fakeWindow = new Proxy(realWin, {
    get(target, prop) {
      if (prop === 'navigator') return fakeNavigator;
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

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(async () => {
    localStorage.removeItem('usidiamond.lang');
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent, TranslateModule.forRoot()],
      providers: [{ provide: DOCUMENT, useValue: makeFakeDocument() }],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function selectEl(): HTMLSelectElement {
    return fixture.nativeElement.querySelector(
      'select.language-switcher-select',
    ) as HTMLSelectElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a <label> bound to the <select> by id/for', () => {
    const el: HTMLElement = fixture.nativeElement;
    const label = el.querySelector<HTMLLabelElement>('label');
    const select = selectEl();
    expect(label).toBeTruthy();
    expect(select).toBeTruthy();
    expect(label!.getAttribute('for')).toBe(select.id);
  });

  it('should render an <option> for every supported language with its endonym', () => {
    const options = Array.from(selectEl().options);
    expect(options.length).toBe(SUPPORTED_LANGUAGES.length);
    for (const lang of SUPPORTED_LANGUAGES) {
      const opt = options.find((o) => o.value === lang.code);
      expect(opt).toBeTruthy();
      expect(opt?.textContent?.trim()).toBe(lang.nativeName);
    }
  });

  it('should carry per-option lang and dir attributes for screen readers', () => {
    const options = Array.from(selectEl().options);
    for (const lang of SUPPORTED_LANGUAGES) {
      const opt = options.find((o) => o.value === lang.code);
      expect(opt?.getAttribute('lang')).toBe(lang.code);
      expect(opt?.getAttribute('dir')).toBe(lang.dir);
    }
  });

  it('should expose an aria-label on the select', () => {
    expect(selectEl().hasAttribute('aria-label')).toBe(true);
  });

  it('should initialise to English when the browser locale is unsupported', () => {
    expect(selectEl().value).toBe('en');
  });

  it('should route change events through LanguageService.use', () => {
    const svc = TestBed.inject(LanguageService);
    const spy = spyOn(svc, 'use').and.callThrough();
    const select = selectEl();
    select.value = 'es';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('es');
  });
});
