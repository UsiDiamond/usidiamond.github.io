import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinksComponent } from './links.component';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a LinkedIn link', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="linkedin.com/in/usidiamond"]');
    expect(link).toBeTruthy();
  });

  it('LinkedIn link should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="linkedin.com/in/usidiamond"]');
    expect(link?.getAttribute('tabindex')).toBe('0');
  });

  it('LinkedIn link should open in a new tab', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="linkedin.com/in/usidiamond"]');
    expect(link?.getAttribute('target')).toBe('_blank');
  });

  it('should render a GitHub link', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="github.com/usidiamond"]');
    expect(link).toBeTruthy();
  });

  it('GitHub link should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="github.com/usidiamond"]');
    expect(link?.getAttribute('tabindex')).toBe('0');
  });

  it('GitHub link should open in a new tab', () => {
    const el: HTMLElement = fixture.nativeElement;
    const link = el.querySelector('a[href*="github.com/usidiamond"]');
    expect(link?.getAttribute('target')).toBe('_blank');
  });
});
