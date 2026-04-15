import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
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
  readonly supported: readonly SupportedLanguage[];
  readonly currentCode: () => string;

  constructor(private readonly languageService: LanguageService) {
    this.supported = languageService.supported;
    this.currentCode = () => languageService.current.code;
  }

  onChange(event: Event): void {
    const code = (event.target as HTMLSelectElement).value;
    this.languageService.use(code);
  }
}
