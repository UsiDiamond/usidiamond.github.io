import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a link to the page source on GitHub', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="github.com/usidiamond"]');
    expect(link).toBeTruthy();
  });

  it('GitHub source link should open in a new tab', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="github.com/usidiamond"]');
    expect(link?.getAttribute('target')).toBe('_blank');
  });

  it('GitHub source link should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="github.com/usidiamond"]');
    expect(link?.getAttribute('tabindex')).toBe('0');
  });

  it('should render a Creative Commons license link', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="creativecommons.org"]');
    expect(link).toBeTruthy();
  });

  it('Creative Commons license link should open in a new tab', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="creativecommons.org"]');
    expect(link?.getAttribute('target')).toBe('_blank');
  });
});
