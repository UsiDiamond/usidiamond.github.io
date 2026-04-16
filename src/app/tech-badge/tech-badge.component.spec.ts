import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechBadgeComponent, TECH_REGISTRY } from './tech-badge.component';

/** Mirror the component's resolveIconUrl logic so tests stay in sync */
function resolveIconUrl(cfg: (typeof TECH_REGISTRY)[string]): string | null {
  if (cfg.iconUrl) return cfg.iconUrl;
  if (cfg.iconSlug) return `https://cdn.simpleicons.org/${cfg.iconSlug}/${cfg.iconColor}`;
  return null;
}

describe('TechBadgeComponent', () => {
  let component: TechBadgeComponent;
  let fixture: ComponentFixture<TechBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders nothing when techs is empty', () => {
    component.techs = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('a').length).toBe(0);
  });

  it('silently ignores unknown tech keys', () => {
    component.techs = ['angular', 'not-a-real-tech'];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('a').length).toBe(1);
  });

  describe('icon-based badges (CDN and custom URL)', () => {
    beforeEach(() => {
      // angular → CDN, coldfusion → custom iconUrl, websphere → custom iconUrl
      component.techs = ['angular', 'coldfusion', 'websphere'];
      fixture.detectChanges();
    });

    it('renders one badge link per tech', () => {
      expect(fixture.nativeElement.querySelectorAll('a.tech-badge-link').length).toBe(3);
    });

    it('each img src matches the resolved icon URL', () => {
      const imgs: NodeListOf<HTMLImageElement> =
        fixture.nativeElement.querySelectorAll('img');
      expect(imgs.length).toBe(3);

      const expectedUrls = ['angular', 'coldfusion', 'websphere'].map(k =>
        resolveIconUrl(TECH_REGISTRY[k]),
      );
      imgs.forEach((img, i) => {
        expect(img.getAttribute('src')).toBe(expectedUrls[i]);
      });
    });

    it('each badge link has an aria-label', () => {
      const links: NodeListOf<HTMLAnchorElement> =
        fixture.nativeElement.querySelectorAll('a');
      links.forEach(link => {
        expect(link.getAttribute('aria-label')).toBeTruthy();
      });
    });

    it('each badge link has a title tooltip', () => {
      const links: NodeListOf<HTMLAnchorElement> =
        fixture.nativeElement.querySelectorAll('a');
      links.forEach(link => {
        expect(link.getAttribute('title')).toBeTruthy();
      });
    });

    it('each badge opens in a new tab with safe rel', () => {
      const links: NodeListOf<HTMLAnchorElement> =
        fixture.nativeElement.querySelectorAll('a');
      links.forEach(link => {
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });

    it('each badge links to the correct release URL', () => {
      const links: NodeListOf<HTMLAnchorElement> =
        fixture.nativeElement.querySelectorAll('a');
      const expected = ['angular', 'coldfusion', 'websphere'].map(
        k => TECH_REGISTRY[k].releaseUrl,
      );
      links.forEach((link, i) => {
        expect(link.getAttribute('href')).toBe(expected[i]);
      });
    });
  });

  describe('text-only badges (no resolved icon URL)', () => {
    beforeEach(() => {
      component.techs = ['cobol', 'phaser'];
      fixture.detectChanges();
    });

    it('renders a .tech-text-badge span for each text-only tech', () => {
      expect(
        fixture.nativeElement.querySelectorAll('.tech-text-badge').length,
      ).toBe(2);
    });

    it('does not render img elements for text-only techs', () => {
      expect(fixture.nativeElement.querySelectorAll('img').length).toBe(0);
    });

    it('text-only badges still have accessible aria-label and safe link attrs', () => {
      const links: NodeListOf<HTMLAnchorElement> =
        fixture.nativeElement.querySelectorAll('a');
      links.forEach(link => {
        expect(link.getAttribute('aria-label')).toBeTruthy();
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Icon availability — one real HTTP HEAD request per tech that has an icon URL.
  // Covers both Simple Icons CDN entries and all custom hosted images.
  // Network-dependent; runs inside the Karma browser sandbox.
  // ---------------------------------------------------------------------------
  describe('icon URL availability (network)', () => {
    const iconEntries = Object.entries(TECH_REGISTRY)
      .map(([key, cfg]) => ({ key, url: resolveIconUrl(cfg) }))
      .filter((e): e is { key: string; url: string } => e.url !== null);

    iconEntries.forEach(({ key, url }) => {
      it(`${key}: icon URL responds 200`, async () => {
        const res = await fetch(url, { method: 'HEAD' });
        expect(res.status)
          .withContext(`${key}: ${url} → HTTP ${res.status}`)
          .toBe(200);
      }, 15000);
    });
  });
});
