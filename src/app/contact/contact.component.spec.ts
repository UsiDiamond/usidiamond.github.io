import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
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

  it('should render a contact section card', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.contact-section')).toBeTruthy();
  });

  it('should render an email link to usi@usidiamond.dev', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href="mailto:usi@usidiamond.dev"]');
    expect(link).toBeTruthy();
  });

  it('email link should display the human readable address', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href="mailto:usi@usidiamond.dev"]');
    expect(link?.textContent?.trim()).toBe('usi@usidiamond.dev');
  });

  it('email link should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href="mailto:usi@usidiamond.dev"]');
    expect(link?.getAttribute('tabindex')).toBe('0');
  });
});
