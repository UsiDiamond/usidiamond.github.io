import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BOOKS, Book } from './books.data';

export interface AuthorGroup {
  author: string;
  books: Book[];
}

export interface SubjectGroup {
  subject: string;
  authors: AuthorGroup[];
  /** Flattened, ordered list: authors alphabetical, titles alphabetical within each author. */
  books: Book[];
}

/** Subjects that should not render at all. */
const HIDDEN_SUBJECTS: ReadonlySet<string> = new Set(['Biology & Medicine']);

/**
 * Group books by subject, then by author within each subject.
 * Subjects are sorted by book count descending so the largest collections
 * surface first; authors and titles sort alphabetically within their group.
 */
function groupBySubjectAndAuthor(books: readonly Book[]): SubjectGroup[] {
  const bySubject = new Map<string, Book[]>();
  for (const b of books) {
    if (HIDDEN_SUBJECTS.has(b.subject)) continue;
    const list = bySubject.get(b.subject) ?? [];
    list.push(b);
    bySubject.set(b.subject, list);
  }

  const groups: SubjectGroup[] = [];
  for (const [subject, subjectBooks] of bySubject) {
    const byAuthor = new Map<string, Book[]>();
    for (const b of subjectBooks) {
      const list = byAuthor.get(b.author) ?? [];
      list.push(b);
      byAuthor.set(b.author, list);
    }
    const authors: AuthorGroup[] = [];
    for (const [author, authorBooks] of byAuthor) {
      authors.push({
        author,
        books: [...authorBooks].sort((a, b) => a.title.localeCompare(b.title)),
      });
    }
    authors.sort((a, b) => a.author.localeCompare(b.author));
    const books = authors.flatMap((a) => a.books);
    groups.push({ subject, authors, books });
  }

  const PINNED_ORDER = ['Fantasy & Science Fiction', 'Literature & Fiction'];
  const pinnedRank = (s: string) => {
    const i = PINNED_ORDER.indexOf(s);
    return i === -1 ? Number.POSITIVE_INFINITY : i;
  };
  groups.sort((a, b) => {
    const ra = pinnedRank(a.subject);
    const rb = pinnedRank(b.subject);
    if (ra !== rb) return ra - rb;
    const countA = a.authors.reduce((sum, g) => sum + g.books.length, 0);
    const countB = b.authors.reduce((sum, g) => sum + g.books.length, 0);
    if (countA !== countB) return countB - countA;
    return a.subject.localeCompare(b.subject);
  });

  return groups;
}

@Component({
  selector: '[reading]',
  host: {
    id: 'maincontent',
    class: 'container mt-1 mb-5',
    style: 'background-color: rgba(255, 255, 255, 0.096); border-radius: 25px;',
  },
  imports: [TranslateModule],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {
  readonly subjectGroups: readonly SubjectGroup[] =
    groupBySubjectAndAuthor(BOOKS);
}
