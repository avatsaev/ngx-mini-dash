


import {Injectable} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {CryptoCurrencyService} from '../services/crypto-currency.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as appActions from '../store/app.actions';
// import {map, tap} from 'rxjs/operators';
// import {switchMap} from 'rxjs/operator/switchMap';
import {CryptoWidget, WeatherWidget, Widget} from '../models/widget';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';

@Injectable()

export class AppEffects {

  @Effect()
  onUpdate$: Observable<Action> = this.actions$.ofType(appActions.UPDATE_WIDGET)
    .map((action: appActions.UpdateWidget) => action.payload)
    .mergeMap((w: Widget) => {

      if(w.type === 'crypto'){
        const widget = w as CryptoWidget;
        return this.cryptoApi.getPrice(widget.inCurrency, widget.outCurrency)
          .map(price => new appActions.UpdateWidgetSuccess({id: widget.id, price}))
      }else{
        const widget = w as WeatherWidget;
        return this.weatherApi.getCityWeather(widget.city)
          .map(({min, max}) => new appActions.UpdateWidgetSuccess({id: widget.id, min, max}))

      }

    });
    // .pipe(
    //   map((action: appActions.UpdateWidget) => action.payload),
    //   switchMap((w: CryptoWidget) =>
    //     this.cryptoApi.getPrice(w.inCurrency, w.outCurrency).pipe(
    //         map(price => new appActions.UpdateWidgetSuccess({id: w.id, price}))
    //       )
    //   )
    // );


  constructor(
    private actions$: Actions,
    private weatherApi: WeatherService,
    private cryptoApi: CryptoCurrencyService
  ){}
}
