import { DISABLED_ROUTES, isRouteDisabled } from './disabled-routes';

describe('disabled-routes', () => {
  it('should expose a non-empty DISABLED_ROUTES array', () => {
    expect(Array.isArray(DISABLED_ROUTES)).toBe(true);
  });

  it('isRouteDisabled should return true for listed routes', () => {
    for (const route of DISABLED_ROUTES) {
      expect(isRouteDisabled(route)).toBe(true);
    }
  });

  it('isRouteDisabled should return false for unknown routes', () => {
    expect(isRouteDisabled('definitely-not-a-route')).toBe(false);
    expect(isRouteDisabled('home')).toBe(false);
  });

  it('should currently disable the reading route', () => {
    // Matches src/disabled-routes.txt. Update both files together.
    expect(DISABLED_ROUTES).toContain('reading');
  });
});
