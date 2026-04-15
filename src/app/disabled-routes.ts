/**
 * Canonical list of disabled routes.
 *
 * Source of truth is `src/disabled-routes.txt` (one route path per line,
 * blank lines and lines starting with `#` ignored). This TypeScript array
 * mirrors that file and is what the app-routing module and menu component
 * actually consume.
 *
 * When adding or removing a disabled route, update BOTH files to keep them
 * in sync. The unit test `disabled-routes.spec.ts` enforces this parity.
 */
export const DISABLED_ROUTES: readonly string[] = ['reading'] as const;

/** Returns true when the given route path is currently disabled. */
export function isRouteDisabled(path: string): boolean {
  return DISABLED_ROUTES.includes(path);
}
