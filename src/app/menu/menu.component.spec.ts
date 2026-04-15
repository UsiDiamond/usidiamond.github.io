import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { routes, MENU_ITEMS } from '../app-routing.module';

/**
 * Small English dictionary matching src/assets/i18n/en/menu.json so the
 * translate pipe in the template resolves to English text inside unit tests
 * (which don't spin up the HTTP-based MultiNamespaceTranslationLoader).
 */
const EN_MENU = {
  menu: {
    toggleNavigation: 'Toggle navigation',
    introduction: 'Introduction',
    projects: 'Projects',
    education: 'Education',
    volunteering: 'Volunteering',
    reading: 'Reading',
    contact: 'Contact',
  },
};

/** Resolve the English label for a MenuItem via its labelKey. */
function labelOf(item: (typeof MENU_ITEMS)[number]): string {
  const [ns, key] = item.labelKey.split('.');
  return (EN_MENU as Record<string, Record<string, string>>)[ns][key];
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuComponent,
        RouterModule.forRoot(routes),
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', EN_MENU, true);
    translate.use('en');

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** Nav buttons as resolved by the component's @ViewChildren('navBtn'). */
  function navButtons(): HTMLButtonElement[] {
    return component.navButtonRefs.map((ref) => ref.nativeElement);
  }

  function buttonByLabel(label: string): HTMLButtonElement | undefined {
    return navButtons().find((b) => b.textContent?.trim() === label);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a nav element', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('nav')).toBeTruthy();
  });

  it('should render one nav button per MENU_ITEMS entry', () => {
    expect(navButtons().length).toBe(MENU_ITEMS.length);
  });

  it('should render nav buttons in the declared order', () => {
    const expected = [...MENU_ITEMS]
      .sort((a, b) => a.order - b.order)
      .map(labelOf);
    const actual = navButtons().map((b) => b.textContent?.trim());
    expect(actual).toEqual(expected);
  });

  it('should have an Introduction link pointing to home', () => {
    const btn = buttonByLabel('Introduction');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('routerlink')).toBe('home');
  });

  it('should have a Projects link pointing to projects', () => {
    const btn = buttonByLabel('Projects');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('routerlink')).toBe('projects');
  });

  it('should have an Education link pointing to education', () => {
    const btn = buttonByLabel('Education');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('routerlink')).toBe('education');
  });

  it('should not have an About link (About content lives on Home)', () => {
    expect(buttonByLabel('About')).toBeUndefined();
  });

  it('should have a Contact link pointing to contact', () => {
    const btn = buttonByLabel('Contact');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('routerlink')).toBe('contact');
  });

  it('all enabled nav links should be keyboard accessible', () => {
    for (const btn of navButtons()) {
      if (btn.hasAttribute('disabled')) continue;
      expect(btn.getAttribute('tabindex')).not.toBe('-1');
    }
  });

  it('should render a disabled button for every MENU_ITEMS entry flagged disabled', () => {
    const disabledItems = MENU_ITEMS.filter((m) => m.disabled);
    for (const item of disabledItems) {
      const btn = buttonByLabel(labelOf(item));
      expect(btn).toBeTruthy();
      expect(btn?.hasAttribute('disabled')).toBe(true);
      expect(btn?.getAttribute('aria-disabled')).toBe('true');
      expect(btn?.classList.contains('disabled')).toBe(true);
      expect(btn?.getAttribute('tabindex')).toBe('-1');
      // Disabled buttons intentionally carry no routerLink attribute.
      expect(btn?.getAttribute('routerlink')).toBeNull();
    }
  });

  it('should not render disabled buttons for MENU_ITEMS entries flagged enabled', () => {
    const enabledItems = MENU_ITEMS.filter((m) => !m.disabled);
    for (const item of enabledItems) {
      const btn = buttonByLabel(labelOf(item));
      expect(btn).toBeTruthy();
      expect(btn?.hasAttribute('disabled')).toBe(false);
    }
  });

  it('should localise the aria-label on the mobile navbar toggler', () => {
    const el: HTMLElement = fixture.nativeElement;
    const toggler = el.querySelector('.navbar-toggler');
    expect(toggler?.getAttribute('aria-label')).toBe('Toggle navigation');
  });

  it('should have a mobile navbar toggler for responsive collapse', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.navbar-toggler')).toBeTruthy();
  });
});
