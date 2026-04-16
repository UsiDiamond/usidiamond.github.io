import {
  DEFAULT_LANGUAGE_CODE,
  findSupportedLanguage,
  SUPPORTED_LANGUAGES,
} from './supported-languages';

describe('SUPPORTED_LANGUAGES', () => {
  it('should contain at least one language', () => {
    expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(0);
  });

  it('every entry should have a non-empty code, englishName, nativeName and a dir', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(lang.code.length).toBeGreaterThan(0);
      expect(lang.englishName.length).toBeGreaterThan(0);
      expect(lang.nativeName.length).toBeGreaterThan(0);
      expect(['ltr', 'rtl']).toContain(lang.dir);
    }
  });

  it('should contain English (en, ltr)', () => {
    const en = SUPPORTED_LANGUAGES.find((l) => l.code === 'en');
    expect(en).toBeTruthy();
    expect(en?.dir).toBe('ltr');
    expect(en?.nativeName).toBe('English');
  });

  it('should contain Arabic (ar) and mark it as RTL', () => {
    const ar = SUPPORTED_LANGUAGES.find((l) => l.code === 'ar');
    expect(ar).toBeTruthy();
    expect(ar?.dir).toBe('rtl');
  });

  it('should contain Yiddish (yi) and mark it as RTL', () => {
    const yi = SUPPORTED_LANGUAGES.find((l) => l.code === 'yi');
    expect(yi).toBeTruthy();
    expect(yi?.dir).toBe('rtl');
  });

  it('should have unique language codes', () => {
    const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
    const unique = new Set(codes);
    expect(unique.size).toBe(SUPPORTED_LANGUAGES.length);
  });

  it('all non-RTL languages should be marked ltr', () => {
    const rtlCodes = new Set(['ar', 'yi']);
    for (const lang of SUPPORTED_LANGUAGES) {
      if (!rtlCodes.has(lang.code)) {
        expect(lang.dir).toBe('ltr');
      }
    }
  });
});

describe('DEFAULT_LANGUAGE_CODE', () => {
  it('should be "en"', () => {
    expect(DEFAULT_LANGUAGE_CODE).toBe('en');
  });

  it('should correspond to a supported language', () => {
    expect(findSupportedLanguage(DEFAULT_LANGUAGE_CODE)).toBeTruthy();
  });
});

describe('findSupportedLanguage', () => {
  it('should find a language by exact code', () => {
    const lang = findSupportedLanguage('en');
    expect(lang).toBeTruthy();
    expect(lang?.code).toBe('en');
  });

  it('should return undefined for an unknown code', () => {
    expect(findSupportedLanguage('xx')).toBeUndefined();
  });

  it('should return undefined for an empty string', () => {
    expect(findSupportedLanguage('')).toBeUndefined();
  });

  it('should find every language in SUPPORTED_LANGUAGES by its own code', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      const found = findSupportedLanguage(lang.code);
      expect(found).toBeTruthy();
      expect(found?.code).toBe(lang.code);
    }
  });

  it('should find French (fr)', () => {
    const lang = findSupportedLanguage('fr');
    expect(lang?.englishName).toBe('French');
    expect(lang?.dir).toBe('ltr');
  });

  it('should find Arabic (ar) with RTL direction', () => {
    const lang = findSupportedLanguage('ar');
    expect(lang?.dir).toBe('rtl');
  });

  it('should find Chinese Simplified (zh-Hans)', () => {
    const lang = findSupportedLanguage('zh-Hans');
    expect(lang?.englishName).toBe('Chinese (Simplified)');
  });

  it('should be case-sensitive and not match "EN"', () => {
    expect(findSupportedLanguage('EN')).toBeUndefined();
  });

  it('should be case-sensitive and not match "Fr"', () => {
    expect(findSupportedLanguage('Fr')).toBeUndefined();
  });
});
