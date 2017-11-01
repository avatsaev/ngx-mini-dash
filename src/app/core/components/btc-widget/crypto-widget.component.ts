import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'crypto-widget',
  template: `

    <article class="tile is-child box">
        <p class="title">
            {{price}} {{outCurrency}}
        </p>
        <p class="subtitle">1 {{inCurrency}}</p>
    </article>

  `,
  styles: [],
  host: {'class': 'tile is-parent'}
})
export class CryptoWidgetComponent implements OnInit {

  @Input() price = 0;
  @Input() outCurrency = 'USD';
  @Input() inCurrency = 'BTC';

  constructor() { }

  ngOnInit() {
  }

}
