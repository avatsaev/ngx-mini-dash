import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'weather-widget',
  template: `

    <article class="tile is-child box">
        <p class="title">{{degreesMin}}°C - {{degreesMax}}°C</p>
        <p class="subtitle">Weather in {{city}}</p>
    </article>

  `,
  styles: [],
  host: {'class': 'tile is-parent'}

})
export class WeatherWidgetComponent implements OnInit {

  @Input() city: string = '';
  @Input() degreesMax: number = 0;
  @Input() degreesMin: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
