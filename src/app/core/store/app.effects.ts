
import {mergeMap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {CryptoCurrencyService} from '../services/crypto-currency.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {CryptoWidget, WeatherWidget, Widget} from '../models/widget';
import * as appActions from '../store/app.actions';
import 'rxjs/add/observable/empty'


@Injectable()
export class AppEffects {

  @Effect()
  onUpdate$: Observable<Action> = this.actions$.ofType(appActions.UPDATE_WIDGET).pipe(

    map((action: appActions.UpdateWidget) => action.payload),

    mergeMap( (widget: Widget) =>

      widget.type == 'crypto' ? this.cryptoApi.getPrice(...extractInOutCurrency(widget)).pipe(

          map( (price: number) => mapToUpdateCryptoAction(widget, price))

      ) : widget.type == 'weather' ? this.weatherApi.getCityWeather(extractCity(widget)).pipe(

          map( ({min, max}) => mapToUpdateWeatherAction(widget, min, max))

      ) : Observable.empty()
    )

  );

  constructor(
    private actions$: Actions,
    private weatherApi: WeatherService,
    private cryptoApi: CryptoCurrencyService
  ) {}
}


const extractInOutCurrency = (w: Widget) => [(w as CryptoWidget).inCurrency, (w as CryptoWidget).outCurrency];
const extractCity = (w: Widget) => (w as WeatherWidget).city;

const mapToUpdateWeatherAction = (widget: Widget, min: number, max: number) => new appActions.UpdateWidgetSuccess({id: widget.id, min, max} as Partial<WeatherWidget>);
const mapToUpdateCryptoAction = (widget: Widget, price: number) => new appActions.UpdateWidgetSuccess({id: widget.id, price} as Partial<CryptoWidget>);