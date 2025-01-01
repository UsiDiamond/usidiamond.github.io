import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-section',
  imports: [],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
})
export class AboutSectionComponent {
  @Input({ required: true })
  title: any;
}
