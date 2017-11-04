import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {CryptoWidgetComponent} from './core/components/btc-widget/crypto-widget.component';
import {WeatherWidgetComponent} from './core/components/weather-widget/weather-widget.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './core/services/weather.service';
import {CryptoCurrencyService} from './core/services/crypto-currency.service';
import {StoreModule} from '@ngrx/store';

import * as fromRoot from './core/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './core/store/app.effects';
import { CryptoWidgetFormComponent } from './core/components/crypto-widget-form/crypto-widget-form.component';
import {FormsModule} from '@angular/forms';
import { WeatherWidgetFormComponent } from './core/components/weather-widget-form/weather-widget-form.component';


@NgModule({
  declarations: [
    AppComponent,
    CryptoWidgetComponent,
    WeatherWidgetComponent,
    CryptoWidgetFormComponent,
    WeatherWidgetFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(fromRoot.reducers),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({maxAge: 10}),
  ],
  providers: [WeatherService, CryptoCurrencyService],
  bootstrap: [AppComponent]
})

export class AppModule {}
