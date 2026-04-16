import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { appRoutes as routes } from '../app.routes';
import { MENU_ITEMS } from '../menu-items';

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

function labelOf(item: (typeof MENU_ITEMS)[number]): string {
  const [ns, key] = item.labelKey.split('.');
  return (EN_MENU as Record<string, Record<string, string>>)[ns][key];
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent, RouterModule.forRoot(routes), TranslateModule.forRoot()],
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', EN_MENU, true);
    translate.use('en');

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
    const expected = [...MENU_ITEMS].sort((a, b) => a.order - b.order).map(labelOf);
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

  describe('onMenuKeydown — keyboard navigation', () => {
    function dispatchKey(key: string): void {
      component.onMenuKeydown(new KeyboardEvent('keydown', { key, bubbles: true }));
    }

    /**
     * Enabled item indices after sort-by-order:
     *   0: home, 1: projects, 2: education, 3: volunteering,
     *   4: reading (disabled), 5: contact
     * enabledIndices = [0, 1, 2, 3, 5]
     */

    beforeEach(() => {
      component.activeIndex = 0;
    });

    it('ArrowRight should advance to the next enabled item', () => {
      dispatchKey('ArrowRight');
      expect(component.activeIndex).toBe(1);
    });

    it('ArrowDown should advance to the next enabled item', () => {
      dispatchKey('ArrowDown');
      expect(component.activeIndex).toBe(1);
    });

    it('ArrowLeft from the first item should wrap to the last enabled item', () => {
      dispatchKey('ArrowLeft');
      expect(component.activeIndex).toBe(5);
    });

    it('ArrowUp from the first item should wrap to the last enabled item', () => {
      dispatchKey('ArrowUp');
      expect(component.activeIndex).toBe(5);
    });

    it('Home should jump to the first enabled item', () => {
      component.activeIndex = 3;
      dispatchKey('Home');
      expect(component.activeIndex).toBe(0);
    });

    it('End should jump to the last enabled item', () => {
      dispatchKey('End');
      expect(component.activeIndex).toBe(5);
    });

    it('ArrowRight should skip the disabled item and land on contact (index 5)', () => {
      component.activeIndex = 3;
      dispatchKey('ArrowRight');
      expect(component.activeIndex).toBe(5);
    });

    it('ArrowLeft from contact (index 5) should skip the disabled item and land on volunteering (index 3)', () => {
      component.activeIndex = 5;
      dispatchKey('ArrowLeft');
      expect(component.activeIndex).toBe(3);
    });

    it('ArrowRight from the last enabled item should wrap back to the first', () => {
      component.activeIndex = 5;
      dispatchKey('ArrowRight');
      expect(component.activeIndex).toBe(0);
    });

    it('unrecognised keys (e.g. Tab) should not change activeIndex', () => {
      component.activeIndex = 2;
      dispatchKey('Tab');
      expect(component.activeIndex).toBe(2);
    });

    it('Enter should not change activeIndex', () => {
      component.activeIndex = 2;
      dispatchKey('Enter');
      expect(component.activeIndex).toBe(2);
    });
  });
});
