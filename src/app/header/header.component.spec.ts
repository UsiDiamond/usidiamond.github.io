import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an h1 heading', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')).toBeTruthy();
  });

  it('h1 should display the site name', () => {
    const el: HTMLElement = fixture.nativeElement;
    const h1 = el.querySelector('h1');
    expect(h1?.textContent).toContain("Usi'ia Lior Diamond");
  });

  it('h1 should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const h1 = el.querySelector('h1');
    expect(h1?.getAttribute('tabindex')).toBe('0');
  });

  it('host element should have the personal-header id', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.getAttribute('id')).toBe('personal-header');
  });
});
