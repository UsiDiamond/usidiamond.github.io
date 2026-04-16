import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { BREAKPOINTS, expectStaysWithin, resetViewport, setViewport } from '../../testing/layout';

describe('HomeComponent responsive', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
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
        fixture = TestBed.createComponent(HomeComponent);
        host = fixture.nativeElement;
        document.body.appendChild(host);
        fixture.detectChanges();
      });

      it('renders the introduction page title', () => {
        expect(host.querySelector('h2')).toBeTruthy();
      });

      it('keeps every .home-section card within the host', () => {
        host.querySelectorAll('.home-section').forEach((card) => expectStaysWithin(card, host));
      });

      it('keeps each [section] widget within the host', () => {
        host.querySelectorAll('[section]').forEach((el) => expectStaysWithin(el, host));
      });

      it('every grid column stays within its row', () => {
        host.querySelectorAll('.row').forEach((row) => {
          row
            .querySelectorAll(':scope > [class*="col-"]')
            .forEach((col) => expectStaysWithin(col, row));
        });
      });
    });
  }
});
