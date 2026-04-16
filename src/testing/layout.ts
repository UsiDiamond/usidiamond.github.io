export const BREAKPOINTS = {
  mobile: { width: 375, height: 700 },
  tablet: { width: 768, height: 900 },
  desktop: { width: 1440, height: 900 },
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

const PX_TOLERANCE = 2;

export function setViewport(width: number, height: number): void {
  const style =
    (document.getElementById('__test-viewport-style') as HTMLStyleElement | null) ??
    Object.assign(document.createElement('style'), { id: '__test-viewport-style' });
  if (!style.isConnected) document.head.appendChild(style);
  style.textContent = `html, body { width: ${width}px !important; height: ${height}px !important; margin: 0; padding: 0; overflow-x: hidden; }`;
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: height });
  window.dispatchEvent(new Event('resize'));
}

export function resetViewport(): void {
  document.getElementById('__test-viewport-style')?.remove();
}

export function expectStaysWithin(child: Element, parent: Element, tolerance = PX_TOLERANCE): void {
  const c = child.getBoundingClientRect();
  const p = parent.getBoundingClientRect();
  if (p.width === 0 || c.width === 0) return;
  expect(c.left).toBeGreaterThanOrEqual(p.left - tolerance);
  expect(c.right).toBeLessThanOrEqual(p.right + tolerance);
}

export function expectCenteredWithin(child: Element, parent: Element, tolerance = 2): void {
  const c = child.getBoundingClientRect();
  const p = parent.getBoundingClientRect();
  if (p.width === 0 || c.width === 0) return;
  const childMid = c.left + c.width / 2;
  const parentMid = p.left + p.width / 2;
  expect(Math.abs(childMid - parentMid)).toBeLessThanOrEqual(tolerance);
}

export function expectNoHorizontalOverflow(root: Element = document.documentElement): void {
  expect(root.scrollWidth).toBeLessThanOrEqual((root as HTMLElement).clientWidth + PX_TOLERANCE);
}

export function hostRect(fixtureEl: HTMLElement): DOMRect {
  return fixtureEl.getBoundingClientRect();
}

export function expectMinTapSize(el: Element, minPx = 44): void {
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return;
  expect(Math.max(r.width, r.height)).toBeGreaterThanOrEqual(minPx - 1);
}

export function expectNoInternalOverflow(el: HTMLElement, tolerance = PX_TOLERANCE): void {
  if (el.clientWidth === 0) return;
  expect(el.scrollWidth).toBeLessThanOrEqual(el.clientWidth + tolerance);
}

export function expectAllStayWithin(
  root: Element,
  selector: string,
  parentSelector?: string,
): void {
  root.querySelectorAll(selector).forEach((child) => {
    const parent = parentSelector ? child.closest(parentSelector) : child.parentElement;
    if (!parent) return;
    expectStaysWithin(child, parent);
  });
}

export function isVisuallyHidden(el: Element): boolean {
  const s = getComputedStyle(el);
  return (
    s.display === 'none' ||
    s.visibility === 'hidden' ||
    parseFloat(s.opacity || '1') === 0 ||
    (el.getBoundingClientRect().width === 0 && el.getBoundingClientRect().height === 0)
  );
}

export async function forEachBreakpoint(
  fn: (name: BreakpointName, width: number, height: number) => void | Promise<void>,
): Promise<void> {
  for (const name of Object.keys(BREAKPOINTS) as BreakpointName[]) {
    const { width, height } = BREAKPOINTS[name];
    setViewport(width, height);
    await fn(name, width, height);
  }
  resetViewport();
}
