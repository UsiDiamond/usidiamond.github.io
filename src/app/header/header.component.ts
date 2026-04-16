import { Component } from '@angular/core';

import { LanguageSwitcherComponent } from '../i18n/language-switcher/language-switcher.component';
import { SparkleTextDirective } from '../shared/sparkle-text.directive';

@Component({
  selector: '[personal-header]',
  imports: [LanguageSwitcherComponent, SparkleTextDirective],
  host: {
    id: 'personal-header',
    class: 'justify-content-center container-fluid mt-2',
  },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
