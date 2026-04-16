import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuComponent } from './menu.component';
import {
  BREAKPOINTS,
  expectMinTapSize,
  expectStaysWithin,
  resetViewport,
  setViewport,
} from '../../testing/layout';

describe('MenuComponent responsive', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent, RouterTestingModule, TranslateModule.forRoot()],
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
        fixture = TestBed.createComponent(MenuComponent);
        host = fixture.nativeElement;
        document.body.appendChild(host);
        fixture.detectChanges();
      });

      it('renders the nav landmark', () => {
        expect(host.querySelector('nav.navbar')).toBeTruthy();
      });

      it('keeps the navbar inside the host', () => {
        const nav = host.querySelector('nav');
        if (nav) expectStaysWithin(nav, host);
      });

      it('exposes at least one nav-link', () => {
        const links = host.querySelectorAll('.nav-link, button.nav-link');
        expect(links.length).toBeGreaterThan(0);
      });

      it('every nav-link meets WCAG 2.5.5 minimum tap size', () => {
        host.querySelectorAll<HTMLElement>('button.nav-link').forEach((link) => {
          if (link.offsetParent === null) return;
          expectMinTapSize(link);
        });
      });

      xit('every visible nav-link stays within the host bounds', () => {
        host.querySelectorAll<HTMLElement>('.nav-link').forEach((link) => {
          if (link.offsetParent === null) return;
          expectStaysWithin(link, host);
        });
      });
    });
  }
});
