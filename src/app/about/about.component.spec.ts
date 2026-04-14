import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
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

  it('should render multiple about sections', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sections = el.querySelectorAll('[section]');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('section questions should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const questions = el.querySelectorAll('h2[tabindex]');
    expect(questions.length).toBeGreaterThan(0);
    questions.forEach((q) => {
      expect(q.getAttribute('tabindex')).toBe('0');
    });
  });
});
