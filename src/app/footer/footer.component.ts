import { Component } from '@angular/core';

@Component({
  selector: '[personal-footer]',
  host: {
    id: 'personal-footer',
    class: 'container-fluid',
  },
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false,
})
export class FooterComponent {}
