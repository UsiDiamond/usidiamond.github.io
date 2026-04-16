import { appRoutes } from './app.routes';

describe('appRoutes', () => {
  it('should be a non-empty array', () => {
    expect(appRoutes.length).toBeGreaterThan(0);
  });

  it('should have a lazy-loaded route for "home"', () => {
    const route = appRoutes.find((r) => r.path === 'home');
    expect(route).toBeTruthy();
    expect(route?.loadComponent).toBeDefined();
    expect(route?.title).toBe('Usi Diamond — Introduction');
  });

  it('should have a lazy-loaded route for "projects"', () => {
    const route = appRoutes.find((r) => r.path === 'projects');
    expect(route).toBeTruthy();
    expect(route?.loadComponent).toBeDefined();
    expect(route?.title).toBe('Usi Diamond — Projects');
  });

  it('should have a lazy-loaded route for "education"', () => {
    const route = appRoutes.find((r) => r.path === 'education');
    expect(route).toBeTruthy();
    expect(route?.loadComponent).toBeDefined();
    expect(route?.title).toBe('Usi Diamond — Education & Training');
  });

  it('should have a lazy-loaded route for "volunteering"', () => {
    const route = appRoutes.find((r) => r.path === 'volunteering');
    expect(route).toBeTruthy();
    expect(route?.loadComponent).toBeDefined();
    expect(route?.title).toBe('Usi Diamond — Volunteering');
  });

  it('should have a lazy-loaded route for "contact"', () => {
    const route = appRoutes.find((r) => r.path === 'contact');
    expect(route).toBeTruthy();
    expect(route?.loadComponent).toBeDefined();
    expect(route?.title).toBe('Usi Diamond — Contact');
  });

  it('should redirect the empty path "" to "home" with full pathMatch', () => {
    const route = appRoutes.find((r) => r.path === '');
    expect(route).toBeTruthy();
    expect(route?.redirectTo).toBe('home');
    expect(route?.pathMatch).toBe('full');
  });

  it('should redirect "about" to "home"', () => {
    const route = appRoutes.find((r) => r.path === 'about');
    expect(route).toBeTruthy();
    expect(route?.redirectTo).toBe('home');
  });

  it('should redirect "reading" to "home"', () => {
    const route = appRoutes.find((r) => r.path === 'reading');
    expect(route).toBeTruthy();
    expect(route?.redirectTo).toBe('home');
    expect(route?.pathMatch).toBe('full');
  });

  it('every redirect route should point to an existing path', () => {
    const definedPaths = new Set(appRoutes.map((r) => r.path));
    const redirectRoutes = appRoutes.filter((r) => r.redirectTo !== undefined);
    for (const route of redirectRoutes) {
      expect(definedPaths.has(route.redirectTo as string)).toBe(true);
    }
  });

  it('all main page routes should use lazy loadComponent', () => {
    const lazyPaths = ['home', 'projects', 'education', 'volunteering', 'contact'];
    for (const path of lazyPaths) {
      const route = appRoutes.find((r) => r.path === path);
      expect(route?.loadComponent).toBeDefined(`expected lazy loadComponent for "${path}"`);
    }
  });
});
