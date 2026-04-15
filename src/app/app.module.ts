import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HttpClient,
} from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { LinksComponent } from './home/links/links.component';
import { SectionComponent } from './home/section/section.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslationLoader } from './i18n/translation-loader';
import { LanguageService } from './i18n/language.service';
import { LanguageSwitcherComponent } from './i18n/language-switcher/language-switcher.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HomeComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuComponent,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      enableViewTransitions: true,
    }),
    LinksComponent,
    SectionComponent,
    LanguageSwitcherComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslationLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(_language: LanguageService) {}
}
