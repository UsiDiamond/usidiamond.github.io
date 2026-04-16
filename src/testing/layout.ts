export const BREAKPOINTS = {
  mobile:  { width: 375,  height: 700 },
  tablet:  { width: 768,  height: 900 },
  desktop: { width: 1440, height: 900 },
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

const PX_TOLERANCE = 1;

export function setViewport(width: number, height: number): void {
  const style = document.getElementById('__test-viewport-style') as HTMLStyleElement | null
    ?? Object.assign(document.createElement('style'), { id: '__test-viewport-style' });
  if (!style.isConnected) document.head.appendChild(style);
  style.textContent = `html, body { width: ${width}px !important; height: ${height}px !important; margin: 0; padding: 0; overflow-x: hidden; }`;
  Object.defineProperty(window, 'innerWidth',  { configurable: true, value: width });
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
