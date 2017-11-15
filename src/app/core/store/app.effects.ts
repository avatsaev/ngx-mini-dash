import {mergeMap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {CryptoCurrencyService} from '../services/crypto-currency.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {CryptoWidget, WeatherWidget, Widget} from '../models/widget';
import * as appActions from '../store/app.actions';
import {empty} from 'rxjs/observable/empty';

const mapToUpdateWeatherAction = (widget: Widget, min: number, max: number) =>
  new appActions.UpdateWidgetSuccess({id: widget.id, min, max} as WeatherWidget);

const mapToUpdateCryptoAction = (widget: Widget, price: number) =>
  new appActions.UpdateWidgetSuccess({id: widget.id, price} as CryptoWidget);

@Injectable()
export class AppEffects {

  @Effect()
  onUpdate$: Observable<Action> = this.actions$.ofType(appActions.UPDATE_WIDGET).pipe(

    map((action: appActions.UpdateWidget) => action.payload),

    mergeMap( (widget: Widget) =>

      widget.type === 'crypto' ? this.cryptoApi.getPrice(widget as CryptoWidget).pipe(

          map( (price: number) => mapToUpdateCryptoAction(widget, price))

      ) : widget.type === 'weather' ? this.weatherApi.getCityWeather((widget as WeatherWidget).city).pipe(

          map( ({min, max}) => mapToUpdateWeatherAction(widget, min, max))

      ) : empty()

    )

  );

  constructor(
    private actions$: Actions,
    private weatherApi: WeatherService,
    private cryptoApi: CryptoCurrencyService
  ) {}
}


