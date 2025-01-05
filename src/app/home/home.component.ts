import { Component } from '@angular/core';

@Component({
  selector: '[home]',
  host: {
    id: 'maincontent',
    class: 'container mt-1 mb-5 backpane',
    style: 'background-color: rgba(255, 255, 255, 0.096); border-radius: 25px;',
  },
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent {}
