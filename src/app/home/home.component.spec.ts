import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have id="maincontent" as a skip link target', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.getAttribute('id')).toBe('maincontent');
  });

  it('should render h2 section headings', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headings = el.querySelectorAll('h2');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('all paragraphs should have a tabindex for keyboard access', () => {
    const el: HTMLElement = fixture.nativeElement;
    const paragraphs = el.querySelectorAll('p[tabindex]');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('should render the social links component', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[links-grid]')).toBeTruthy();
  });

  it('should render four Q&A sections', () => {
    const el: HTMLElement = fixture.nativeElement;
    const sections = el.querySelectorAll('[section]');
    expect(sections.length).toBe(4);
  });

  it('should contain each Q&A section prompt', () => {
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('What music does it like?');
    expect(text).toContain('What causes does it care about?');
    expect(text).toContain('What games does it like?');
    expect(text).toContain('What does the Usi do for money?');
  });

  /**
   * Regression guard for the pronouns-page SVG icon. The path geometry,
   * viewBox, fill, and dimensions are pinned so an accidental edit to
   * home.component.html that distorts the icon will fail this test.
   * Update the constant below intentionally if the icon is redesigned.
   */
  describe('pronouns-page icon', () => {
    // Canonical path data (the Pronouns logo). Update only when the icon is
    // intentionally redesigned.
    const EXPECTED_PATH_D =
      'M396.52 174.35c1.35-2.4.21-4.35-2.54-4.35l-48.2.03c-2.75 0-6.15 1.94-7.54 4.31l-118.1 199.77c-16.48 27.15-39.48 33.15-61.58 30.47-37.94-4.6-58.34-32.45-58.34-69.54 0-37.25 30.31-67.56 67.56-67.56h75c2.75 0 6.12-1.95 7.48-4.34l27.03-47.2c1.37-2.39.23-4.34-2.52-4.34h-107c-68.06 0-123.44 55.37-123.44 123.44 0 32.89 12.85 68.36 36.22 91.54 23.03 22.84 53.8 31.21 86.64 31.89 18.54.21 69.46-.21 93.33-42.68 26.73-47.57 136-241.44 136-241.44zM571.94 244.44c-23.03-22.84-53.8-31.21-86.64-31.89-18.54-.21-69.46.21-93.33 42.68-26.72 47.55-136 241.42-136 241.42-1.35 2.4-.21 4.35 2.54 4.35l48.2-.03c2.75 0 6.15-1.94 7.54-4.31l118.1-199.77c16.48-27.15 39.48-33.15 61.58-30.47 37.94 4.6 58.34 32.45 58.34 69.54 0 37.25-30.31 67.56-67.56 67.56h-75c-2.75 0-6.12 1.95-7.48 4.34l-27.03 47.2c-1.37 2.39-.23 4.34 2.52 4.34h107c68.06 0 123.44-55.37 123.44-123.44 0-32.87-12.85-68.34-36.22-91.52z';

    function svg(): SVGSVGElement | null {
      const el: HTMLElement = fixture.nativeElement;
      return el.querySelector<SVGSVGElement>('svg.pronouns-svg');
    }

    it('should render exactly one pronouns SVG', () => {
      const el: HTMLElement = fixture.nativeElement;
      const svgs = el.querySelectorAll('svg.pronouns-svg');
      expect(svgs.length).toBe(1);
    });

    it('should render the icon inside the Pronouns Page anchor', () => {
      const el: HTMLElement = fixture.nativeElement;
      const anchor = el.querySelector<HTMLAnchorElement>(
        'a[title="Pronouns Page"]',
      );
      expect(anchor).toBeTruthy();
      expect(anchor?.querySelector('svg.pronouns-svg')).toBeTruthy();
    });

    it('should declare the canonical viewBox and width', () => {
      const el = svg();
      expect(el).toBeTruthy();
      expect(el?.getAttribute('viewBox')).toBe('0 0 650 650');
      expect(el?.getAttribute('width')).toBe('100');
    });

    it('should contain exactly one <path> with the canonical d= geometry', () => {
      const el = svg();
      expect(el).toBeTruthy();
      const paths = el!.querySelectorAll('path');
      expect(paths.length).toBe(1);
      expect(paths[0].getAttribute('d')).toBe(EXPECTED_PATH_D);
    });

    it('path should carry the canonical fill colour', () => {
      const path = svg()?.querySelector('path');
      expect(path?.getAttribute('fill')).toBe('darkgrey');
    });
  });
});
