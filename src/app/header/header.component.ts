import { Component } from '@angular/core';

@Component({
  selector: '[personal-header]',
  host: {
    id: 'personal-header',
    class: 'justify-content-center container-fluid mt-2',
  },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {}
