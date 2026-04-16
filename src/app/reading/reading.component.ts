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
  books: Book[];
}

const HIDDEN_SUBJECTS: ReadonlySet<string> = new Set(['Biology & Medicine']);

const PINNED_ORDER = ['Fantasy & Science Fiction', 'Literature & Fiction'];

function pinnedRank(subject: string): number {
  const i = PINNED_ORDER.indexOf(subject);
  return i === -1 ? Number.POSITIVE_INFINITY : i;
}

function groupBySubjectAndAuthor(books: readonly Book[]): SubjectGroup[] {
  const bySubject = new Map<string, Book[]>();
  for (const book of books) {
    if (HIDDEN_SUBJECTS.has(book.subject)) continue;
    const list = bySubject.get(book.subject) ?? [];
    list.push(book);
    bySubject.set(book.subject, list);
  }

  const groups: SubjectGroup[] = [];
  for (const [subject, subjectBooks] of bySubject) {
    const byAuthor = new Map<string, Book[]>();
    for (const book of subjectBooks) {
      const list = byAuthor.get(book.author) ?? [];
      list.push(book);
      byAuthor.set(book.author, list);
    }
    const authors: AuthorGroup[] = [...byAuthor.entries()]
      .map(([author, authorBooks]) => ({
        author,
        books: [...authorBooks].sort((a, b) => a.title.localeCompare(b.title)),
      }))
      .sort((a, b) => a.author.localeCompare(b.author));

    groups.push({ subject, authors, books: authors.flatMap((a) => a.books) });
  }

  return groups.sort((a, b) => {
    const ra = pinnedRank(a.subject);
    const rb = pinnedRank(b.subject);
    if (ra !== rb) return ra - rb;
    const countDiff =
      b.authors.reduce((sum, g) => sum + g.books.length, 0) -
      a.authors.reduce((sum, g) => sum + g.books.length, 0);
    return countDiff !== 0 ? countDiff : a.subject.localeCompare(b.subject);
  });
}

@Component({
  selector: '[reading]',
  imports: [TranslateModule],
  host: {
    id: 'maincontent',
    tabindex: '-1',
    class: 'container mt-1 mb-5',
  },
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent {
  readonly subjectGroups: readonly SubjectGroup[] = groupBySubjectAndAuthor(BOOKS);
}
