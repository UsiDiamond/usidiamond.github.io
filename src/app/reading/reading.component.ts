import { Component } from '@angular/core';
import { BOOKS, Book } from './books.data';

export interface AuthorGroup {
  author: string;
  books: Book[];
}

export interface SubjectGroup {
  subject: string;
  authors: AuthorGroup[];
}

/**
 * Group books by subject, then by author within each subject.
 * Subjects are sorted by book count descending so the largest collections
 * surface first; authors and titles sort alphabetically within their group.
 */
function groupBySubjectAndAuthor(books: readonly Book[]): SubjectGroup[] {
  const bySubject = new Map<string, Book[]>();
  for (const b of books) {
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
    groups.push({ subject, authors });
  }

  const PINNED_FIRST = 'Fantasy & Science Fiction';
  groups.sort((a, b) => {
    if (a.subject === PINNED_FIRST && b.subject !== PINNED_FIRST) return -1;
    if (b.subject === PINNED_FIRST && a.subject !== PINNED_FIRST) return 1;
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
  imports: [],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.css',
})
export class ReadingComponent {
  readonly subjectGroups: readonly SubjectGroup[] = groupBySubjectAndAuthor(BOOKS);
}
