import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])],
    });
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        common: {
          skipToMainContent: 'Skip to main content',
          pauseAnimation: 'Pause animation',
          resumeAnimation: 'Resume animation',
        },
      },
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
    expect(skipLink?.classList.contains('visually-hidden-focusable')).toBeTrue();
  });

  it('should render a router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('router-outlet')).toBeTruthy();
  });
});
