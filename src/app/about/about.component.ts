import { Component } from '@angular/core';
import { AboutSectionComponent } from './about-section/about-section.component';

@Component({
  selector: 'app-about',
  imports: [AboutSectionComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
