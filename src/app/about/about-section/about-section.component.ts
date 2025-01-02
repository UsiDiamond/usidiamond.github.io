import { Component, Input } from '@angular/core';

@Component({
  selector: '[section]',
  imports: [],
  host: {
    class: 'col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 mx-3 my-3 px-6 py-3',
  },
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
})
export class AboutSectionComponent {}
