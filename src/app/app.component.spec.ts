import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [AppComponent, BackgroundComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      { common: { skipToMainContent: 'Skip to main content' } },
      true,
    );
    translate.use('en');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a skip to main content link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const skipLink = el.querySelector('a.skip');
    expect(skipLink).toBeTruthy();
    expect(skipLink!.textContent?.trim()).toBe('Skip to main content');
  });

  it('skip link should be visually hidden and focusable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const skipLink = el.querySelector('a.skip');
    expect(
      skipLink?.classList.contains('visually-hidden-focusable'),
    ).toBeTrue();
  });

  it('should render a router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('router-outlet')).toBeTruthy();
  });
});
