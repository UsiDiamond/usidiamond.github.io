import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

import { LanguageService } from '../language.service';
import { SupportedLanguage } from '../supported-languages';

@Component({
  selector: '[language-switcher]',
  imports: [TranslateModule],
  host: { class: 'language-switcher' },
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);

  readonly supported: readonly SupportedLanguage[] = this.languageService.supported;
  readonly currentCode = toSignal(this.languageService.current$.pipe(map((l) => l.code)), {
    initialValue: this.languageService.current.code,
  });

  onChange(event: Event): void {
    this.languageService.use((event.target as HTMLSelectElement).value);
  }
}
