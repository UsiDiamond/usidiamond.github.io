import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { VolunteeringComponent } from './volunteering.component';

describe('VolunteeringComponent', () => {
  let component: VolunteeringComponent;
  let fixture: ComponentFixture<VolunteeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteeringComponent, TranslateModule.forRoot()],
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        volunteering: {
          title: 'Where does the Usi give back?',
          civilRightsAndSocialAction: 'Civil Rights and Social Action',
          economicEmpowerment: 'Economic Empowerment',
          scienceAndTechnology: 'Science and Technology',
          artsAndCulture: 'Arts and Culture',
        },
      },
      true,
    );
    translate.use('en');

    fixture = TestBed.createComponent(VolunteeringComponent);
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

  it('should render volunteering section cards', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sections = el.querySelectorAll('.volunteering-section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should render all eleven volunteering entries', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sections = el.querySelectorAll('.volunteering-section');
    expect(sections.length).toBe(11);
  });

  it('should display all four category section headings', () => {
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('Civil Rights and Social Action');
    expect(text).toContain('Economic Empowerment');
    expect(text).toContain('Science and Technology');
    expect(text).toContain('Arts and Culture');
  });

  it('should have keyboard-accessible headings', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headings = el.querySelectorAll('h2[tabindex]');
    expect(headings.length).toBeGreaterThan(0);
    headings.forEach((h) => {
      expect(h.getAttribute('tabindex')).toBe('0');
    });
  });

  it('should have keyboard-accessible text content', () => {
    const el: HTMLElement = fixture.nativeElement;
    const paragraphs = el.querySelectorAll('p[tabindex]');
    expect(paragraphs.length).toBeGreaterThan(0);
    paragraphs.forEach((p) => {
      expect(p.getAttribute('tabindex')).toBe('0');
    });
  });

  it('should contain the Health and Safety Specialist entry', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Health and Safety Specialist');
    expect(el.textContent).toContain('The Pride Center of Maryland');
  });

  it('should contain the Neurodiversity in Business volunteer role', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Lead Software Development Engineer');
    expect(el.textContent).toContain('Neurodiversity in Business');
  });

  it('should contain the SSA LGBTAC parliamentarian role', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Parliamentarian');
    expect(el.textContent).toContain('SSA Headquarters LGBT Advisory Committee');
  });

  it('should contain the Securityplus Federal Credit Union roles', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Chairperson');
    expect(el.textContent).toContain('Information Technology Risk Manager');
    expect(el.textContent).toContain('Securityplus Federal Credit Union');
  });

  it('should contain arts and culture performing entries', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Life Care Services');
    expect(el.textContent).toContain('The Audrey Herman Spotlighters Theatre');
    expect(el.textContent).toContain('Greenspring Valley Orchestra');
    expect(el.textContent).toContain('Young Victorian Theatre Company');
    expect(el.textContent).toContain('Baltimore Playwrights Festival');
    expect(el.textContent).toContain('Opera Vivente');
  });

  it('should include external links for referenced organisations', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = el.querySelectorAll('a[href]');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should open external links safely with rel="noopener noreferrer"', () => {
    const el: HTMLElement = fixture.nativeElement;
    const externalLinks = el.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });
  });
});
