import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechBadgeComponent, TECH_REGISTRY } from './tech-badge.component';

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
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(0);
  });

  it('silently ignores unknown tech keys', () => {
    component.techs = ['angular', 'not-a-real-tech'];
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(1);
  });

  describe('icon-based badges', () => {
    beforeEach(() => {
      component.techs = ['angular', 'spring', 'openshift'];
      fixture.detectChanges();
    });

    it('renders one badge link per tech', () => {
      const links = fixture.nativeElement.querySelectorAll('a.tech-badge-link');
      expect(links.length).toBe(3);
    });

    it('each img src matches the Simple Icons CDN pattern', () => {
      const imgs: NodeListOf<HTMLImageElement> =
        fixture.nativeElement.querySelectorAll('img');
      expect(imgs.length).toBe(3);
      imgs.forEach(img => {
        expect(img.src).toMatch(
          /^https:\/\/cdn\.simpleicons\.org\/[a-z0-9]+\/[0-9A-Fa-f]{6}$/,
        );
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
      const expected = ['angular', 'spring', 'openshift'].map(
        k => TECH_REGISTRY[k].releaseUrl,
      );
      links.forEach((link, i) => {
        expect(link.getAttribute('href')).toBe(expected[i]);
      });
    });
  });

  describe('text-only badges (no iconSlug)', () => {
    beforeEach(() => {
      component.techs = ['phaser', 'apachecamel', 'cobol', 'jcl'];
      fixture.detectChanges();
    });

    it('renders a .tech-text-badge span for each text-only tech', () => {
      const spans = fixture.nativeElement.querySelectorAll('.tech-text-badge');
      expect(spans.length).toBe(4);
    });

    it('does not render any img elements', () => {
      const imgs = fixture.nativeElement.querySelectorAll('img');
      expect(imgs.length).toBe(0);
    });

    it('text badges still have accessible aria-label and safe link attrs', () => {
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
  // CDN availability — each test issues a real HTTP request to verify the icon
  // exists at cdn.simpleicons.org. These are network-dependent integration tests.
  // ---------------------------------------------------------------------------
  describe('icon CDN availability', () => {
    const iconEntries = Object.entries(TECH_REGISTRY).filter(
      ([, cfg]) => cfg.iconSlug !== null,
    );

    iconEntries.forEach(([key, cfg]) => {
      it(`${key} (${cfg.iconSlug}): cdn.simpleicons.org responds 200`, async () => {
        const url = `https://cdn.simpleicons.org/${cfg.iconSlug}/${cfg.iconColor}`;
        const res = await fetch(url);
        expect(res.status)
          .withContext(`${key}: GET ${url} → ${res.status}`)
          .toBe(200);
      }, 15000);
    });
  });
});
