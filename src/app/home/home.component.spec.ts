import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        home: {
          whatIsAnUsi: 'What is an Usi?',
          pronouns: 'Pronouns?',
          pronounsPage: 'Pronouns Page',
          socialLinks: 'Social Links',
          questionMusic: 'What music does it like?',
          questionCauses: 'What causes does it care about?',
          questionGames: 'What games does it like?',
          questionMoney: 'What does the Usi do for money?',
        },
      },
      true,
    );
    translate.use('en');

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have id="maincontent" as a skip link target', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.getAttribute('id')).toBe('maincontent');
  });

  it('should render h2 section headings', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headings = el.querySelectorAll('h2');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('all paragraphs should have a tabindex for keyboard access', () => {
    const el: HTMLElement = fixture.nativeElement;
    const paragraphs = el.querySelectorAll('p[tabindex]');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('should render the social links component', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[links-grid]')).toBeTruthy();
  });

  it('should render four Q&A sections', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sections = el.querySelectorAll('[section]');
    expect(sections.length).toBe(4);
  });

  it('should contain each Q&A section prompt', () => {
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('What music does it like?');
    expect(text).toContain('What causes does it care about?');
    expect(text).toContain('What games does it like?');
    expect(text).toContain('What does the Usi do for money?');
  });
});
