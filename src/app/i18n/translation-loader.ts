import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const TRANSLATION_NAMESPACES: readonly string[] = [
  'common',
  'menu',
  'home',
  'projects',
  'education',
  'volunteering',
  'reading',
  'contact',
] as const;

export class MultiNamespaceTranslationLoader implements TranslateLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string): Observable<TranslationObject> {
    const requests = TRANSLATION_NAMESPACES.reduce<Record<string, Observable<TranslationObject>>>(
      (acc, ns) => {
        acc[ns] = this.http
          .get<TranslationObject>(`assets/i18n/${lang}/${ns}.json`)
          .pipe(catchError(() => of({} as TranslationObject)));
        return acc;
      },
      {},
    );

    return forkJoin(requests).pipe(map((chunks) => chunks as TranslationObject));
  }
}

export function createTranslationLoader(http: HttpClient): TranslateLoader {
  return new MultiNamespaceTranslationLoader(http);
}
