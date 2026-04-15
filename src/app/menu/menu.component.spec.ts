import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { routes } from '../app-routing.module';
import { DISABLED_ROUTES } from '../disabled-routes';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent, RouterModule.forRoot(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a nav element', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('nav')).toBeTruthy();
  });

  it('should have an Introduction link pointing to home', () => {
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector('button[routerLink="home"]');
    expect(btn).toBeTruthy();
    expect(btn?.textContent?.trim()).toBe('Introduction');
  });

  it('should have a Projects link pointing to projects', () => {
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector('button[routerLink="projects"]');
    expect(btn).toBeTruthy();
    expect(btn?.textContent?.trim()).toBe('Projects');
  });

  it('should have an Education link pointing to education', () => {
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector('button[routerLink="education"]');
    expect(btn).toBeTruthy();
    expect(btn?.textContent?.trim()).toBe('Education');
  });

  it('should not have an About link (About content lives on Home)', () => {
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector('button[routerLink="about"]');
    expect(btn).toBeNull();
  });

  it('should have a Contact link pointing to contact', () => {
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector('button[routerLink="contact"]');
    expect(btn).toBeTruthy();
    expect(btn?.textContent?.trim()).toBe('Contact');
  });

  it('all nav links should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const navBtns = el.querySelectorAll('button[routerLink]');
    navBtns.forEach((btn) => {
      expect(btn.getAttribute('tabindex')).not.toBe('-1');
    });
  });

  it('should render the Reading button as disabled (route is in DISABLED_ROUTES)', () => {
    expect(DISABLED_ROUTES).toContain('reading');
    const el: HTMLElement = fixture.nativeElement;
    // Disabled variant has no routerLink and carries aria-disabled="true"
    const activeReadingBtn = el.querySelector('button[routerLink="reading"]');
    expect(activeReadingBtn).toBeNull();
    const disabledBtns = Array.from(
      el.querySelectorAll('button[aria-disabled="true"]'),
    );
    const readingBtn = disabledBtns.find(
      (b) => b.textContent?.trim() === 'Reading',
    );
    expect(readingBtn).toBeTruthy();
    expect(readingBtn?.classList.contains('disabled')).toBe(true);
    expect(readingBtn?.getAttribute('tabindex')).toBe('-1');
  });

  it('no nav link outside DISABLED_ROUTES should be disabled', () => {
    const el: HTMLElement = fixture.nativeElement;
    const disabledBtns = Array.from(
      el.querySelectorAll('button[aria-disabled="true"]'),
    );
    disabledBtns.forEach((btn) => {
      const label = (btn.textContent ?? '').trim().toLowerCase();
      // Each disabled button's label should map to a disabled route (case-insensitive).
      const matches = DISABLED_ROUTES.some((r) => r.toLowerCase() === label);
      expect(matches).toBe(true);
    });
  });

  it('should have a mobile navbar toggler for responsive collapse', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.navbar-toggler')).toBeTruthy();
  });
});
