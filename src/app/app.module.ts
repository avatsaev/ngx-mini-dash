import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import {CryptoWidgetComponent} from './core/components/btc-widget/crypto-widget.component';
import { WeatherWidgetComponent } from './core/components/weather-widget/weather-widget.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './core/services/weather.service';
import {CryptoCurrencyService} from './core/services/crypto-currency.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CryptoWidgetComponent,
    WeatherWidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WeatherService, CryptoCurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
