import { Component, Inject, DOCUMENT } from '@angular/core';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  @Inject(DOCUMENT) document: Document;
  constructor() {}
  title = "Usi Diamond's Website";
}
