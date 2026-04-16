import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
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

  it('should render project section cards', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sections = el.querySelectorAll('[data-testid="project-card"]');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('all project headings should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headings = el.querySelectorAll('h2[tabindex]');
    expect(headings.length).toBeGreaterThan(0);
    headings.forEach((h) => {
      expect(h.getAttribute('tabindex')).toBe('0');
    });
  });

  it('all project text should have a tabindex for keyboard access', () => {
    const el: HTMLElement = fixture.nativeElement;
    const paragraphs = el.querySelectorAll('p[tabindex]');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('should contain the mySocialSecurity Online Self Service project', () => {
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent;
    expect(text).toContain('mySocialSecurity - Online Self Service');
  });
});
