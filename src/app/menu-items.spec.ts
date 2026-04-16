import { MENU_ITEMS } from './menu-items';

describe('MENU_ITEMS', () => {
  it('should contain exactly six items', () => {
    expect(MENU_ITEMS.length).toBe(6);
  });

  it('every item should have a non-empty labelKey, route, a numeric order, and a boolean disabled flag', () => {
    for (const item of MENU_ITEMS) {
      expect(item.labelKey.length).toBeGreaterThan(0);
      expect(item.route.length).toBeGreaterThan(0);
      expect(typeof item.order).toBe('number');
      expect(typeof item.disabled).toBe('boolean');
    }
  });

  it('every labelKey should follow the "namespace.key" pattern', () => {
    for (const item of MENU_ITEMS) {
      expect(item.labelKey).toMatch(/^[a-z]+\.[a-zA-Z]+$/);
    }
  });

  it('should contain an item for the "home" route', () => {
    const item = MENU_ITEMS.find((m) => m.route === 'home');
    expect(item).toBeTruthy();
    expect(item?.disabled).toBe(false);
  });

  it('should contain an item for the "projects" route', () => {
    const item = MENU_ITEMS.find((m) => m.route === 'projects');
    expect(item).toBeTruthy();
    expect(item?.disabled).toBe(false);
  });

  it('should contain an item for the "education" route', () => {
    const item = MENU_ITEMS.find((m) => m.route === 'education');
    expect(item).toBeTruthy();
    expect(item?.disabled).toBe(false);
  });

  it('should contain an item for the "volunteering" route', () => {
    const item = MENU_ITEMS.find((m) => m.route === 'volunteering');
    expect(item).toBeTruthy();
    expect(item?.disabled).toBe(false);
  });

  it('should contain an item for the "contact" route', () => {
    const item = MENU_ITEMS.find((m) => m.route === 'contact');
    expect(item).toBeTruthy();
    expect(item?.disabled).toBe(false);
  });

  it('should mark the "reading" item as disabled', () => {
    const reading = MENU_ITEMS.find((m) => m.route === 'reading');
    expect(reading).toBeTruthy();
    expect(reading?.disabled).toBe(true);
  });

  it('should have unique order values', () => {
    const orders = Array.from(MENU_ITEMS).map((m) => m.order);
    const unique = new Set(orders);
    expect(unique.size).toBe(MENU_ITEMS.length);
  });

  it('should have unique routes', () => {
    const routes = Array.from(MENU_ITEMS).map((m) => m.route);
    const unique = new Set(routes);
    expect(unique.size).toBe(MENU_ITEMS.length);
  });

  it('order values should be consecutive integers starting at 1', () => {
    const sorted = [...MENU_ITEMS].sort((a, b) => a.order - b.order);
    sorted.forEach((item, i) => {
      expect(item.order).toBe(i + 1);
    });
  });

  it('should have only one disabled item', () => {
    const disabledItems = Array.from(MENU_ITEMS).filter((m) => m.disabled);
    expect(disabledItems.length).toBe(1);
  });
});
