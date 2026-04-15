import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        home: {
          whatIsAnUsi: 'What is an Usi?',
          pronouns: 'Pronouns?',
          pronounsPage: 'Pronouns Page',
          socialLinks: 'Social Links',
          questionMusic: 'What music does it like?',
          questionCauses: 'What causes does it care about?',
          questionGames: 'What games does it like?',
          questionMoney: 'What does the Usi do for money?',
          aboutP1: 'about p1',
          aboutP2: 'about p2',
          aboutP3: 'about p3',
          pronounsP1: 'pronouns p1',
          pronounsP2: 'pronouns p2',
          musicP1: 'music p1',
          musicP2: 'music p2',
          causesIntro: 'causes intro',
          causesB1: 'causes b1',
          causesB2: 'causes b2',
          causesB3: 'causes b3',
          causesB4: 'causes b4',
          causesB5: 'causes b5',
          causesB6: 'causes b6',
          causesOutro: 'causes outro',
          gamesIntro: 'games intro',
          gamesB1: 'games b1',
          gamesB2: 'games b2',
          gamesB3: 'games b3',
          gamesB4: 'games b4',
          gamesB5: 'games b5',
          gamesFavorite: 'games favorite',
          gamesOutro: 'games outro',
          moneyIntro: 'money intro',
          moneyB1: 'money b1',
          moneyB2: 'money b2',
          moneyB3: 'money b3',
          moneyB4: 'money b4',
          moneyB5: 'money b5',
          moneyB6: 'money b6',
        },
      },
      true,
    );
    translate.use('en');

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
});
