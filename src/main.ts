import { bootstrapApplication } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { createTranslationLoader } from './app/i18n/translation-loader';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideRouter(appRoutes, withViewTransitions(), withPreloading(PreloadAllModules)),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslationLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      }),
    ),
  ],
}).catch((err) => console.error(err));
