import { Component } from '@angular/core';

@Component({
  selector: '[links-grid]',
  host: {
    id: 'links-grid',
    class: 'links-grid container-sm',
  },
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent {}
