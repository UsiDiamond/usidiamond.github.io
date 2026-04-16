import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationComponent, TranslateModule.forRoot()],
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        education: {
          educationAndTraining: 'Education & Training',
          licensesAndCertifications: 'Licenses & Certifications',
          skills: 'Skills',
          stevenson: {
            degree:
              'B.S. Interdisciplinary Studies (CIS/Applied Mathematics), Mathematical Modeling and Information Retrieval',
            activities:
              'Activities and societies: Tutor, International mathematical modeling competitions (successful participant and honorable mention), and approved extended undergrad research on search algorithms and information retrieval. Greenspring Valley Orchestra Tenor Soloist',
            program:
              'Followed a traditional engineering and applied mathematics curriculum towards business applications with core programming courses, topics in advanced mathematics, and an extended joint Mathematics & CIS adjudicated thesis project.',
          },
          shazy: {
            degree:
              'Traditional Training in the Melocchi Method and Coaching in Tenor Works in The Grand Repertoire, Voice and Opera',
            description:
              '15+ years of vocal training in the method of Melocchi with coaching in the tenor repertoire focused on lyric and spinto roles. Focused on Verdi, Bellini, Donizetti, Puccini, and Mozart operas.',
          },
          umbc: {
            degree: 'Computer Software Engineering',
            activities:
              'Activities and societies: Professional level training in Enterprise Java Development in a Mainframe environment.',
          },
          cert: {
            firstAidAndCPR: 'Adult and Pediatric First Aid/CPR/AED',
            bls: 'Basic Life Support for Healthcare and Public Safety (BLS)',
            introToR: 'Introduction to R Course',
            advancedTutor: 'Certified Advanced Tutor',
          },
        },
      },
      true,
    );
    translate.use('en');

    fixture = TestBed.createComponent(EducationComponent);
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

  it('should render education section cards', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sections = el.querySelectorAll('.education-section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('all education headings should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headings = el.querySelectorAll('h2[tabindex]');
    expect(headings.length).toBeGreaterThan(0);
    headings.forEach((h) => {
      expect(h.getAttribute('tabindex')).toBe('0');
    });
  });

  it('all education text should have a tabindex for keyboard access', () => {
    const el: HTMLElement = fixture.nativeElement;
    const paragraphs = el.querySelectorAll('p[tabindex]');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('should contain the Stevenson University entry', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Stevenson University');
  });

  it('should contain the University of Maryland Baltimore County entry', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('University of Maryland Baltimore County');
  });

  it('should contain the Shazy King vocal training entry', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Shazy King');
  });

  it('should render a Licenses & Certifications section heading', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Licenses & Certifications');
  });

  it('should contain the Adult and Pediatric First Aid/CPR/AED certification', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Adult and Pediatric First Aid/CPR/AED');
  });

  it('should contain the BLS certification', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Basic Life Support for Healthcare and Public Safety (BLS)');
  });

  it('should contain the Introduction to R Course certification', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Introduction to R Course');
  });

  it('should contain the Certified Advanced Tutor certification', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Certified Advanced Tutor');
  });
});
