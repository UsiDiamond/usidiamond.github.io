import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { routes } from '../app-routing.module';

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

  it('should have an About link pointing to about', () => {
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector('button[routerLink="about"]');
    expect(btn).toBeTruthy();
    expect(btn?.textContent?.trim()).toBe('About');
  });

  it('all nav links should be keyboard accessible', () => {
    const el: HTMLElement = fixture.nativeElement;
    const navBtns = el.querySelectorAll('button[routerLink]');
    navBtns.forEach((btn) => {
      expect(btn.getAttribute('tabindex')).not.toBe('-1');
    });
  });

  it('no nav link should be disabled', () => {
    const el: HTMLElement = fixture.nativeElement;
    const disabledBtns = el.querySelectorAll('button[aria-disabled="true"]');
    expect(disabledBtns.length).toBe(0);
  });

  it('should have a mobile navbar toggler for responsive collapse', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.navbar-toggler')).toBeTruthy();
  });
});
