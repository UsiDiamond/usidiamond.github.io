import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Per-component namespaces. Each value is both the top-level key in the
 * resolved dictionary and the basename of the JSON file loaded from
 * src/assets/i18n/<lang>/<namespace>.json.
 *
 * To add a new namespace: create src/assets/i18n/en/<name>.json (plus a copy
 * for each other supported language) and list its name here.
 */
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

/**
 * ngx-translate loader that fetches every namespace file for the active
 * language in parallel and merges them into a single dictionary keyed by
 * namespace, so templates read like `'menu.introduction'` or `'home.title'`.
 * Missing namespace files degrade gracefully to {} so a partial translation
 * set still lets the page render with English fallbacks via
 * TranslateService.useDefaultLang('en').
 */
export class MultiNamespaceTranslationLoader implements TranslateLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string): Observable<TranslationObject> {
    const requests = TRANSLATION_NAMESPACES.reduce<
      Record<string, Observable<TranslationObject>>
    >((acc, ns) => {
      acc[ns] = this.http
        .get<TranslationObject>(`assets/i18n/${lang}/${ns}.json`)
        .pipe(catchError(() => of({} as TranslationObject)));
      return acc;
    }, {});

    return forkJoin(requests).pipe(
      map((chunks) => chunks as unknown as TranslationObject),
    );
  }
}

/** Factory function suitable for `TranslateModule.forRoot({ loader: { useFactory: ... } })`. */
export function createTranslationLoader(http: HttpClient): TranslateLoader {
  return new MultiNamespaceTranslationLoader(http);
}
