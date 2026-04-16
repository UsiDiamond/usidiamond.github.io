import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';
import {
  BREAKPOINTS,
  expectCenteredWithin,
  expectStaysWithin,
  resetViewport,
  setViewport,
} from '../testing/layout';

type PageCase = {
  name: string;
  component: typeof ContactComponent;
};

const PAGES: PageCase[] = [
  { name: 'contact', component: ContactComponent },
  { name: 'education', component: EducationComponent },
  { name: 'projects', component: ProjectsComponent },
  { name: 'volunteering', component: VolunteeringComponent },
];

describe('Responsive layout', () => {
  afterEach(() => resetViewport());

  for (const bp of Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>) {
    const { width, height } = BREAKPOINTS[bp];

    describe(`${bp} (${width}×${height})`, () => {
      beforeEach(() => setViewport(width, height));

      for (const page of PAGES) {
        describe(page.name, () => {
          let fixture: ComponentFixture<unknown>;
          let host: HTMLElement;

          beforeEach(async () => {
            await TestBed.configureTestingModule({
              imports: [page.component, TranslateModule.forRoot()],
            }).compileComponents();
            TestBed.inject(TranslateService).use('en');
            fixture = TestBed.createComponent(page.component);
            host = fixture.nativeElement;
            document.body.appendChild(host);
            fixture.detectChanges();
          });

          afterEach(() => host.remove());

          it('every diamond-card stays within the host bounds', () => {
            const cards = host.querySelectorAll('.diamond-card');
            if (!cards.length) return;
            cards.forEach((card) => expectStaysWithin(card, host));
          });

          it('every heading stays within the host bounds', () => {
            const headings = host.querySelectorAll('h1, h2');
            if (!headings.length) return;
            headings.forEach((h) => expectStaysWithin(h, host));
          });

          it('the first page-title heading is horizontally centred', () => {
            const titleRow = host.querySelector('.row .col-12 h2');
            if (!titleRow) return;
            expectCenteredWithin(titleRow, host);
          });

          it('row columns do not exceed their row container', () => {
            const rows = host.querySelectorAll('.row');
            rows.forEach((row) => {
              row
                .querySelectorAll(':scope > [class*="col-"]')
                .forEach((col) => expectStaysWithin(col, row));
            });
          });
        });
      }
    });
  }
});
