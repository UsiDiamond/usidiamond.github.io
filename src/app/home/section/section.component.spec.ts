import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionComponent } from './section.component';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the backpane container', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.section-backpane')).toBeTruthy();
  });

  it('should project [question] content into the heading', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2[tabindex="0"]')).toBeTruthy();
  });

  it('should project [content] into the keyboard-accessible body', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.content[tabindex="0"]')).toBeTruthy();
  });
});
