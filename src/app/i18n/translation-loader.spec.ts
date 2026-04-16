import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import {
  createTranslationLoader,
  MultiNamespaceTranslationLoader,
  TRANSLATION_NAMESPACES,
} from './translation-loader';

describe('TRANSLATION_NAMESPACES', () => {
  it('should be a non-empty array', () => {
    expect(TRANSLATION_NAMESPACES.length).toBeGreaterThan(0);
  });

  it('should include "common"', () => {
    expect(TRANSLATION_NAMESPACES).toContain('common');
  });

  it('should include "menu"', () => {
    expect(TRANSLATION_NAMESPACES).toContain('menu');
  });

  it('should include all expected page namespaces', () => {
    const expected = ['home', 'projects', 'education', 'volunteering', 'reading', 'contact'];
    for (const ns of expected) {
      expect(TRANSLATION_NAMESPACES).toContain(ns);
    }
  });

  it('should have unique namespace names', () => {
    const unique = new Set(TRANSLATION_NAMESPACES);
    expect(unique.size).toBe(TRANSLATION_NAMESPACES.length);
  });
});

describe('MultiNamespaceTranslationLoader', () => {
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let loader: MultiNamespaceTranslationLoader;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    loader = new MultiNamespaceTranslationLoader(httpSpy);
  });

  it('should instantiate', () => {
    expect(loader).toBeTruthy();
  });

  it('should make one HTTP GET request per namespace', (done) => {
    httpSpy.get.and.returnValue(of({}));
    loader.getTranslation('en').subscribe(() => {
      expect(httpSpy.get).toHaveBeenCalledTimes(TRANSLATION_NAMESPACES.length);
      done();
    });
  });

  it('should request the correct URL for each namespace', (done) => {
    httpSpy.get.and.returnValue(of({}));
    loader.getTranslation('en').subscribe(() => {
      for (const ns of TRANSLATION_NAMESPACES) {
        expect(httpSpy.get).toHaveBeenCalledWith(`assets/i18n/en/${ns}.json`);
      }
      done();
    });
  });

  it('should use the provided language code in the URL path', (done) => {
    httpSpy.get.and.returnValue(of({}));
    loader.getTranslation('es').subscribe(() => {
      const calls = httpSpy.get.calls.all();
      for (const call of calls) {
        expect(call.args[0]).toContain('/es/');
      }
      done();
    });
  });

  it('should merge all namespace responses into a single object keyed by namespace', (done) => {
    (httpSpy.get as jasmine.Spy).and.callFake((url: string) => {
      const ns = (url as string).split('/').pop()?.replace('.json', '') as string;
      return of({ key: `value-${ns}` });
    });
    loader.getTranslation('en').subscribe((result) => {
      const merged = result as Record<string, unknown>;
      for (const ns of TRANSLATION_NAMESPACES) {
        expect(merged[ns]).toBeTruthy();
      }
      done();
    });
  });

  it('should fall back to an empty object when an HTTP request fails', (done) => {
    httpSpy.get.and.returnValue(throwError(() => new Error('404 Not Found')));
    loader.getTranslation('en').subscribe({
      next: (result) => {
        const merged = result as Record<string, unknown>;
        for (const ns of TRANSLATION_NAMESPACES) {
          expect(merged[ns]).toEqual({});
        }
        done();
      },
      error: () => fail('should not propagate the error'),
    });
  });

  it('should succeed even when only some namespaces fail', (done) => {
    (httpSpy.get as jasmine.Spy).and.callFake((url: string) => {
      return url.includes('common')
        ? throwError(() => new Error('not found'))
        : of({ data: 'ok' });
    });
    loader.getTranslation('en').subscribe({
      next: (result) => {
        const merged = result as Record<string, unknown>;
        expect(merged['common']).toEqual({});
        expect(merged['menu']).toBeTruthy();
        done();
      },
      error: () => fail('should not propagate the error'),
    });
  });
});

describe('createTranslationLoader', () => {
  it('should return a MultiNamespaceTranslationLoader', () => {
    const http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    const loader = createTranslationLoader(http);
    expect(loader instanceof MultiNamespaceTranslationLoader).toBe(true);
  });

  it('should return a loader that is functional', () => {
    const http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
    (http.get as jasmine.Spy).and.returnValue(of({}));
    const loader = createTranslationLoader(http);
    expect(loader.getTranslation).toBeDefined();
  });
});
