import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = "Usi Diamond's Website";

  constructor(@Inject(DOCUMENT) private doc: Document) {}

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
