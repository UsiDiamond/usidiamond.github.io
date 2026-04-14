import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingComponent } from './reading.component';
import { BOOKS } from './books.data';

const HIDDEN_SUBJECTS = new Set(['Biology & Medicine']);
const VISIBLE_BOOKS = BOOKS.filter((b) => !HIDDEN_SUBJECTS.has(b.subject));

describe('ReadingComponent', () => {
  let component: ReadingComponent;
  let fixture: ComponentFixture<ReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingComponent);
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

  it('should render a card for every visible book', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('.reading-card');
    expect(cards.length).toBe(VISIBLE_BOOKS.length);
  });

  it('should render at least 250 books (library-sized list)', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('.reading-card');
    expect(cards.length).toBeGreaterThan(250);
  });

  it('should group visible books into subject panes, one per unique visible subject', () => {
    const uniqueSubjects = new Set(VISIBLE_BOOKS.map((b) => b.subject));
    expect(component.subjectGroups.length).toBe(uniqueSubjects.size);

    const el: HTMLElement = fixture.nativeElement;
    const subjectHeaders = el.querySelectorAll('.reading-subject');
    expect(subjectHeaders.length).toBe(uniqueSubjects.size);
  });

  it('should not render any hidden subject sections', () => {
    for (const subject of component.subjectGroups) {
      expect(HIDDEN_SUBJECTS.has(subject.subject)).toBe(false);
    }
  });

  it('should subdivide each subject by author', () => {
    for (const subject of component.subjectGroups) {
      const uniqueAuthorsInSubject = new Set(
        VISIBLE_BOOKS.filter((b) => b.subject === subject.subject).map(
          (b) => b.author,
        ),
      );
      expect(subject.authors.length).toBe(uniqueAuthorsInSubject.size);
    }
  });

  it('should sort authors alphabetically within each subject', () => {
    for (const subject of component.subjectGroups) {
      const authors = subject.authors.map((a) => a.author);
      const sorted = [...authors].sort((a, b) => a.localeCompare(b));
      expect(authors).toEqual(sorted);
    }
  });

  it('should sort books within each author group by title', () => {
    for (const subject of component.subjectGroups) {
      for (const authorGroup of subject.authors) {
        const titles = authorGroup.books.map((b) => b.title);
        const sorted = [...titles].sort((a, b) => a.localeCompare(b));
        expect(titles).toEqual(sorted);
      }
    }
  });

  it('should pin Fantasy & Science Fiction then Literature & Fiction, then order the rest by book count descending', () => {
    expect(component.subjectGroups[0].subject).toBe(
      'Fantasy & Science Fiction',
    );
    expect(component.subjectGroups[1].subject).toBe('Literature & Fiction');
    const rest = component.subjectGroups.slice(2);
    const counts = rest.map((g) =>
      g.authors.reduce((sum, a) => sum + a.books.length, 0),
    );
    for (let i = 1; i < counts.length; i++) {
      expect(counts[i - 1]).toBeGreaterThanOrEqual(counts[i]);
    }
  });

  it('should flatten each subject into a books[] preserving author-then-title order', () => {
    for (const subject of component.subjectGroups) {
      const expected = subject.authors.flatMap((a) => a.books);
      expect(subject.books.length).toBe(expected.length);
      for (let i = 0; i < expected.length; i++) {
        expect(subject.books[i]).toBe(expected[i]);
      }
    }
  });

  it('should have keyboard-accessible subject headings', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headings = el.querySelectorAll('h2[tabindex]');
    headings.forEach((h) => {
      expect(h.getAttribute('tabindex')).toBe('0');
    });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should have keyboard-accessible card text (title and author)', () => {
    const el: HTMLElement = fixture.nativeElement;
    const titles = el.querySelectorAll('.reading-card-title[tabindex="0"]');
    const authors = el.querySelectorAll('.reading-card-author[tabindex="0"]');
    expect(titles.length).toBe(VISIBLE_BOOKS.length);
    expect(authors.length).toBe(VISIBLE_BOOKS.length);
  });

  it('each card should link to Amazon and open in a new tab safely', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('a.reading-card');
    expect(cards.length).toBe(VISIBLE_BOOKS.length);
    cards.forEach((card) => {
      const href = card.getAttribute('href') ?? '';
      expect(href).toContain('amazon.com');
      expect(card.getAttribute('target')).toBe('_blank');
      expect(card.getAttribute('rel')).toContain('noopener');
      expect(card.getAttribute('rel')).toContain('noreferrer');
    });
  });

  it('should contain representative books from diverse subjects', () => {
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('The Anarchy');
    expect(text).toContain('The King in Yellow');
    expect(text).toContain('Classical Mechanics');
    expect(text).toContain('The Bahir');
    expect(text).toContain('The Cambridge History of Japan');
  });

  it('every book entry should have a title, author, subject, parts >=1, and amazon URL', () => {
    for (const b of BOOKS) {
      expect(b.title?.length).toBeGreaterThan(0);
      expect(b.author?.length).toBeGreaterThan(0);
      expect(b.subject?.length).toBeGreaterThan(0);
      expect(b.parts).toBeGreaterThanOrEqual(1);
      expect(b.amazonUrl).toMatch(/^https:\/\/www\.amazon\.com\//);
    }
  });

  it('should display a "(N vols)" annotation on collapsed multi-volume series', () => {
    const collapsed = VISIBLE_BOOKS.filter((b) => b.parts > 1);
    if (collapsed.length === 0) return;
    const el: HTMLElement = fixture.nativeElement;
    const annotations = el.querySelectorAll('.reading-card-vols');
    expect(annotations.length).toBe(collapsed.length);
  });

  it('should collapse The Cambridge History of Japan into a single chip', () => {
    const cambridge = BOOKS.find(
      (b) => b.title === 'The Cambridge History of Japan',
    );
    expect(cambridge).toBeTruthy();
    expect(cambridge!.parts).toBe(6);
  });
});
