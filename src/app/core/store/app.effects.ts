
import {mergeMap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {CryptoCurrencyService} from '../services/crypto-currency.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {CryptoWidget, WeatherWidget, Widget} from '../models/widget';
import * as appActions from '../store/app.actions';


@Injectable()

export class AppEffects {

  @Effect()
  onUpdate$: Observable<Action> = this.actions$.ofType(appActions.UPDATE_WIDGET)
    .pipe(
      map((action: appActions.UpdateWidget) => action.payload),
      mergeMap( (widget: Widget) => {

        switch (widget.type) {
          case 'crypto' : {
            const w = widget as CryptoWidget;
            return this.cryptoApi.getPrice(w.inCurrency, w.outCurrency).pipe(
                map( price => new appActions.UpdateWidgetSuccess({id: w.id, price})
              )
            )
          } 
          case 'weather' : {
            const w = widget as WeatherWidget;
            return this.weatherApi.getCityWeather(w.city).pipe(
                map( ({min, max}) => new appActions.UpdateWidgetSuccess({id: w.id, min, max})
              )
            )
          }
        }
      })
      
    );

  constructor(
    private actions$: Actions,
    private weatherApi: WeatherService,
    private cryptoApi: CryptoCurrencyService
  ) {}
}
