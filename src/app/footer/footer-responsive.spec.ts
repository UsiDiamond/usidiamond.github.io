import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './footer.component';
import { BREAKPOINTS, expectStaysWithin, resetViewport, setViewport } from '../../testing/layout';

describe('FooterComponent responsive', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, TranslateModule.forRoot()],
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
        fixture = TestBed.createComponent(FooterComponent);
        host = fixture.nativeElement;
        document.body.appendChild(host);
        fixture.detectChanges();
      });

      it('every visible link and icon stays within the host', () => {
        host.querySelectorAll<HTMLElement>('a, svg, img').forEach((el) => {
          if (el.offsetParent === null) return;
          expectStaysWithin(el, host);
        });
      });
    });
  }
});
