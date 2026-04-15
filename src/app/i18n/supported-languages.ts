/**
 * The list of languages the site supports, in the order they should appear in
 * the header switcher. The order roughly mirrors the ten most-spoken languages
 * in US homes per recent American Community Survey data.
 *
 * - code: BCP-47-style tag used both as the translate module lang and as the
 *         directory name under src/assets/i18n/
 * - englishName: neutral English label (used for aria-label and fallback)
 * - nativeName: endonym shown in the switcher UI
 * - dir: 'rtl' for right-to-left scripts so the switcher can flip direction
 */
export interface SupportedLanguage {
  readonly code: string;
  readonly englishName: string;
  readonly nativeName: string;
  readonly dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  { code: 'en', englishName: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'es', englishName: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'zh-Hans', englishName: 'Chinese (Simplified)', nativeName: '中文（简体）', dir: 'ltr' },
  { code: 'tl', englishName: 'Tagalog', nativeName: 'Tagalog', dir: 'ltr' },
  { code: 'vi', englishName: 'Vietnamese', nativeName: 'Tiếng Việt', dir: 'ltr' },
  { code: 'ar', englishName: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'fr', englishName: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'ko', englishName: 'Korean', nativeName: '한국어', dir: 'ltr' },
  { code: 'ru', englishName: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  { code: 'de', englishName: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'yi', englishName: 'Yiddish', nativeName: 'ייִדיש', dir: 'rtl' },
];

export const DEFAULT_LANGUAGE_CODE = 'en';

export function findSupportedLanguage(code: string): SupportedLanguage | undefined {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code);
}
