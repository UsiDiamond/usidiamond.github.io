import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { LanguageSwitcherComponent } from '../i18n/language-switcher/language-switcher.component';
import {
  BREAKPOINTS,
  expectCenteredWithin,
  expectStaysWithin,
  resetViewport,
  setViewport,
} from '../../testing/layout';

describe('HeaderComponent responsive', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent, TranslateModule.forRoot()],
      declarations: [HeaderComponent],
    }).compileComponents();
    TestBed.inject(TranslateService).use('en');
  });

  afterEach(() => {
    host?.remove();
    resetViewport();
  });

  for (const name of Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>) {
    const { width, height } = BREAKPOINTS[name];

    describe(`${name} (${width}×${height})`, () => {
      beforeEach(() => {
        setViewport(width, height);
        fixture = TestBed.createComponent(HeaderComponent);
        host = fixture.nativeElement;
        document.body.appendChild(host);
        fixture.detectChanges();
      });

      it('renders the site title as an <h1>', () => {
        expect(host.querySelector('h1')).toBeTruthy();
      });

      it('keeps the site title within the host bounds', () => {
        const h1 = host.querySelector('h1');
        if (h1) expectStaysWithin(h1, host);
      });

      it('centres the site title horizontally within the host', () => {
        const h1 = host.querySelector('h1');
        if (h1) expectCenteredWithin(h1, host);
      });

      it('renders the language switcher without overflowing the host', () => {
        const switcher = host.querySelector('[language-switcher], app-language-switcher');
        if (switcher) expectStaysWithin(switcher, host);
      });
    });
  }
});
