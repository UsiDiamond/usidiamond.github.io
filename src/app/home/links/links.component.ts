import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: '[links-grid]',
  imports: [],
  host: {
    id: 'links-grid',
    style:
      'justify-content: center;  align-items: center;  display: flex;  flex-wrap: wrap;  justify-content: center;  padding-bottom: 2em;',
    class: 'links-grid container-sm',
  },
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent {}
