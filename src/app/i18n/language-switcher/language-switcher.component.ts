import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import { SupportedLanguage } from '../supported-languages';

/**
 * Accessible language switcher used in the site header.
 *
 * Implemented as a single native <select> for:
 *  - built-in keyboard support (arrow keys, type-to-find)
 *  - screen-reader announcement of both the field label and the current value
 *  - mobile-friendly picker on touch devices with no extra code
 *
 * The <label> is programmatically bound to the <select> via for/id and its
 * text comes from the common.language translation (so the label itself is
 * localised). Option labels render in each language's endonym (nativeName)
 * regardless of the currently active language, so a user who doesn't read
 * the current language can still recognise their own.
 */
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
