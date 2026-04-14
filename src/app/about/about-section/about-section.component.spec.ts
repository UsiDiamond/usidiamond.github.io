import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutSectionComponent } from './about-section.component';

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section-backpane container', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.section-backpane')).toBeTruthy();
  });

  it('host element should have responsive grid classes', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.classList.contains('col-12')).toBeTrue();
    expect(el.classList.contains('col-md-5')).toBeTrue();
  });
});
