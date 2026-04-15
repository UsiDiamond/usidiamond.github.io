import { Injectable, Inject, DOCUMENT } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DEFAULT_LANGUAGE_CODE,
  findSupportedLanguage,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
} from './supported-languages';

const STORAGE_KEY = 'usidiamond.lang';

/**
 * Owns the active site language: chooses an initial value (localStorage →
 * browser preference → default), tells ngx-translate to load it, updates the
 * `<html lang>` and `<html dir>` attributes for RTL/LTR layouts, and lets
 * callers subscribe to changes.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly supported: readonly SupportedLanguage[] = SUPPORTED_LANGUAGES;

  private readonly currentSubject: BehaviorSubject<SupportedLanguage>;

  constructor(
    private readonly translate: TranslateService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.translate.addLangs(this.supported.map((l) => l.code));
    this.translate.setDefaultLang(DEFAULT_LANGUAGE_CODE);

    const initial = this.pickInitialLanguage();
    this.currentSubject = new BehaviorSubject<SupportedLanguage>(initial);
    this.applyLanguage(initial);
  }

  /** Observable emitting the currently active SupportedLanguage. */
  get current$(): Observable<SupportedLanguage> {
    return this.currentSubject.asObservable();
  }

  /** The currently active SupportedLanguage (snapshot). */
  get current(): SupportedLanguage {
    return this.currentSubject.value;
  }

  /** Change the active language. Silently ignored if `code` isn't supported. */
  use(code: string): void {
    const found = findSupportedLanguage(code);
    if (!found) return;
    this.applyLanguage(found);
    this.currentSubject.next(found);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, found.code);
    } catch {
      // Storage may be disabled (private mode) — tolerate silently.
    }
  }

  private applyLanguage(lang: SupportedLanguage): void {
    this.translate.use(lang.code);
    const html = this.document.documentElement;
    html.setAttribute('lang', lang.code);
    html.setAttribute('dir', lang.dir);
  }

  private pickInitialLanguage(): SupportedLanguage {
    const stored = this.readStoredLanguage();
    if (stored) return stored;
    const nav = this.document.defaultView?.navigator?.language;
    if (nav) {
      const exact = findSupportedLanguage(nav);
      if (exact) return exact;
      const prefix = nav.split('-')[0];
      const byPrefix = findSupportedLanguage(prefix);
      if (byPrefix) return byPrefix;
    }
    return findSupportedLanguage(DEFAULT_LANGUAGE_CODE)!;
  }

  private readStoredLanguage(): SupportedLanguage | undefined {
    try {
      const code = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return code ? findSupportedLanguage(code) : undefined;
    } catch {
      return undefined;
    }
  }
}
