import { Component } from '@angular/core';
import {WeatherService} from './core/services/weather.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {CryptoCurrencyService} from './core/services/crypto-currency.service';


@Component({
  selector: 'root',
  template: `

    <navbar></navbar>

    <div class="hero-body">
      <div class="container has-text-centered">

          <section class="hero is-info welcome is-small">
              <div class="hero-body">
                  <div class="container">
                      <h1 class="title">
                          Welcome to <b>NGX MINI-DASH</b>
                      </h1>
                      <h2 class="subtitle">
                          I hope you are having a great day!
                      </h2>
                  </div>
              </div>
          </section>
          
          <div class="tile is-ancestor has-text-centered">
              
              <crypto-widget 
                      [outCurrency]="(btcPriceData$ | async)?.outCurrency" 
                      inCurrency="BTC"
                      [price]="(btcPriceData$ | async)?.price"
              ></crypto-widget>
              
              <crypto-widget
                      [outCurrency]="(ethPriceData$ | async)?.outCurrency"
                      inCurrency="ETH"
                      [price]="(ethPriceData$ | async)?.price"
              ></crypto-widget>
              
              <weather-widget
                city="Strasbourg"
                [degreesMin]="(weatherData$ | async)?.min"
                [degreesMax]="(weatherData$ | async)?.max"
              ></weather-widget>
              
          </div>
          
      </div>
    </div>
      
    
  `,
  styles: [`
    .welcome{
        background: linear-gradient(to right, #5B86E5, #36D1DC);
        margin-bottom: 2rem;
        border-radius: 10px;
    }
  `]
})
export class AppComponent {

  weatherData$: Observable<any>;
  btcPriceData$: Observable<any>;
  ethPriceData$: Observable<any>;


  constructor(private weatherApi: WeatherService, private cryptoApi: CryptoCurrencyService) {
    this.weatherData$ = this.weatherApi.getCityWeather('strasbourg');
    this.btcPriceData$ = this.cryptoApi.getBtcPrice('EUR');
    this.ethPriceData$ = this.cryptoApi.getEthPrice('EUR');
  }
}
