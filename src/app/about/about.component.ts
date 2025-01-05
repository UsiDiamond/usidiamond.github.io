import { Component } from '@angular/core';
import { AboutSectionComponent } from './about-section/about-section.component';
import { style } from '@angular/animations';

@Component({
  selector: '[about]',
  host: {
    id: 'maincontent',
    class: 'container mt-1 mb-5 backpane',
    style: 'background-color: rgba(255, 255, 255, 0.096); border-radius: 25px;',
  },
  imports: [AboutSectionComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
