import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { BackgroundComponent } from './background/background.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: '[app-root]',
  imports: [
    RouterOutlet,
    TranslateModule,
    BackgroundComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly doc = inject(DOCUMENT);

  skipToMain(event: Event): void {
    event.preventDefault();
    const target = this.doc.getElementById('maincontent');
    if (!target) return;
    if (target.getAttribute('tabindex') === null) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: false });
    target.scrollIntoView({ block: 'start' });
  }
}
