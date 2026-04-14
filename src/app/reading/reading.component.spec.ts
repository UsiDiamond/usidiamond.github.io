import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadingComponent } from './reading.component';
import { BOOKS } from './books.data';

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

  it('should render a chip for every book in the data file', () => {
    const el: HTMLElement = fixture.nativeElement;
    const chips = el.querySelectorAll('.reading-chip');
    expect(chips.length).toBe(BOOKS.length);
  });

  it('should render at least 300 books (library-sized list)', () => {
    const el: HTMLElement = fixture.nativeElement;
    const chips = el.querySelectorAll('.reading-chip');
    expect(chips.length).toBeGreaterThan(300);
  });

  it('should group books into subject panes, one per unique subject', () => {
    const uniqueSubjects = new Set(BOOKS.map((b) => b.subject));
    expect(component.subjectGroups.length).toBe(uniqueSubjects.size);

    const el: HTMLElement = fixture.nativeElement;
    const subjectHeaders = el.querySelectorAll('.reading-subject');
    expect(subjectHeaders.length).toBe(uniqueSubjects.size);
  });

  it('should subdivide each subject by author', () => {
    for (const subject of component.subjectGroups) {
      const uniqueAuthorsInSubject = new Set(
        BOOKS.filter((b) => b.subject === subject.subject).map((b) => b.author)
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

  it('should pin Fantasy & Science Fiction first, then order the rest by book count descending', () => {
    expect(component.subjectGroups[0].subject).toBe('Fantasy & Science Fiction');
    const rest = component.subjectGroups.slice(1);
    const counts = rest.map((g) =>
      g.authors.reduce((sum, a) => sum + a.books.length, 0)
    );
    for (let i = 1; i < counts.length; i++) {
      expect(counts[i - 1]).toBeGreaterThanOrEqual(counts[i]);
    }
  });

  it('should render an h3 author header for every author group', () => {
    const totalAuthors = component.subjectGroups.reduce(
      (sum, s) => sum + s.authors.length,
      0
    );
    const el: HTMLElement = fixture.nativeElement;
    const authorHeaders = el.querySelectorAll('h3.reading-author');
    expect(authorHeaders.length).toBe(totalAuthors);
  });

  it('should have keyboard-accessible subject headings', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headings = el.querySelectorAll('h2[tabindex]');
    headings.forEach((h) => {
      expect(h.getAttribute('tabindex')).toBe('0');
    });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should have keyboard-accessible author headings', () => {
    const el: HTMLElement = fixture.nativeElement;
    const headings = el.querySelectorAll('h3[tabindex="0"]');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should render an Amazon link per book opening in a new tab safely', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = el.querySelectorAll('.reading-chip-link');
    expect(links.length).toBe(BOOKS.length);
    links.forEach((link) => {
      const href = link.getAttribute('href') ?? '';
      expect(href).toContain('amazon.com');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });
  });

  it('should contain representative books from diverse subjects', () => {
    const el: HTMLElement = fixture.nativeElement;
    const text = el.textContent ?? '';
    expect(text).toContain('The Anarchy');
    expect(text).toContain('A Wizard of Earthsea');
    expect(text).toContain('The Phoenix Project');
    expect(text).toContain('Gödel, Escher, Bach');
    expect(text).toContain('The Bahir');
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
    const collapsed = BOOKS.filter((b) => b.parts > 1);
    if (collapsed.length === 0) return;
    const el: HTMLElement = fixture.nativeElement;
    const annotations = el.querySelectorAll('.reading-chip-vols');
    expect(annotations.length).toBe(collapsed.length);
  });

  it('should collapse The Cambridge History of Japan into a single chip', () => {
    const cambridge = BOOKS.find(
      (b) => b.title === 'The Cambridge History of Japan'
    );
    expect(cambridge).toBeTruthy();
    expect(cambridge!.parts).toBe(6);
  });
});
