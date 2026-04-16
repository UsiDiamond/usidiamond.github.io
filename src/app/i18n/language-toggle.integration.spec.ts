import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjectsComponent } from '../projects/projects.component';

describe('Runtime language toggle', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { projects: { title: 'What has the Usi built?' } }, true);
    translate.setTranslation('es', { projects: { title: '¿Qué ha construido el Usi?' } }, true);
    translate.use('en');

    fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();
  });

  it('should render the English title initially', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent?.trim()).toBe('What has the Usi built?');
  });

  it('should re-render when translate.use() switches to Spanish', () => {
    translate.use('es');
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent?.trim()).toBe('¿Qué ha construido el Usi?');
  });

  it('should flip back when translate.use() returns to English', () => {
    translate.use('es');
    fixture.detectChanges();
    translate.use('en');
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent?.trim()).toBe('What has the Usi built?');
  });
});
