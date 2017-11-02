
import {Component, OnInit} from '@angular/core';
import * as appActions from './core/store/app.actions';
import * as fromRoot from './core/store';
import {Store} from '@ngrx/store';
import {CryptoWidget, WeatherWidget, Widget} from './core/models/widget';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'root',
  template: `

    <div class="hero-body">
      <div class="container has-text-centered">

        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Welcome to <b>NGX MINI-DASH</b>
              </h1>
              <span class="subtitle" style="font-size: 14px">
                Try adding some weather or crypto currency widgets, they will update in real time.
              </span>

              <br>

              <span class="" style="font-size: 14px">
                Made by <a href="https://twitter.com/avatsaev" target="_blank"><u><b> 
                <i class="fa fa-twitter" aria-hidden="true"></i>@avatsaev</b></u></a>, 
                source code available on 
                <a href="https://github.com/avatsaev/ngx-mini-dash" target="_blank"><u><b> 
                <i class="fa fa-github" aria-hidden="true"></i>GitHub</b></u></a>
              </span>

              <br>
              <br>

              <button (click)="showCryptoForm = !showCryptoForm" class="button is-small is-warning">
                <span class="icon">
                   <i class="fa fa-plus" aria-hidden="true"></i>
                </span>
                <span> Coin Widget</span>

              </button>
              <button (click)="showWeatherForm = !showWeatherForm" class="button is-small is-warning ">
                <span class="icon">
                   <i class="fa fa-plus" aria-hidden="true"></i>
                </span>
                <span>Weather widget</span>

              </button>
            </div>
          </div>
        </section>

        <crypto-widget-form *ngIf="showCryptoForm"
                            (onSubmit)="onCryptoWidgetAdd($event)"
                            (onCancel)="showCryptoForm = false"
        ></crypto-widget-form>

        <weather-widget-form *ngIf="showWeatherForm"
                             (onSubmit)="onWeatherWidgetAdd($event)"
                             (onCancel)="showWeatherForm = false"
        ></weather-widget-form>

        <div class="tile is-ancestor has-text-centered">

          <div class="tile is-parent" *ngFor="let w of widgets$ | async; trackBy: widgetsTrackByfn">

            <crypto-widget *ngIf="w.type =='crypto'"
                           [widget]="w"
                           [refreshInterval]="3000"
                           (onClose)="onWidgetClose($event)"
                           (onUpdateRequest)="onWidgetUpdate($event)"
            ></crypto-widget>

            <weather-widget *ngIf="w.type =='weather'"
                            [widget]="w"
                            [refreshInterval]="60000"
                            (onClose)="onWidgetClose($event)"
                            (onUpdateRequest)="onWidgetUpdate($event)"
            ></weather-widget>

          </div>

        </div>

      </div>

    </div>

  `,
  styles: [`
    .welcome {
      background: linear-gradient(to right, #5B86E5, #36D1DC);
      margin-bottom: 2rem;
      border-radius: 10px;
    }
    .is-warning{
      color: #555;
    }
  `]
})

export class AppComponent implements OnInit {

  widgets$: Observable<Widget[]>;
  widgetsTrackByfn = (w: Widget) => w.id;

  showCryptoForm = false;
  showWeatherForm = false;


  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {

    this.widgets$ = this.store.select(fromRoot.getAllWidgets);

    const btcWidget = new CryptoWidget('BTC', 'EUR');
    const strasbourgWeatherWidget = new WeatherWidget('Strasbourg');

    this.store.dispatch(new appActions.AddWidget(btcWidget));
    this.store.dispatch(new appActions.AddWidget(strasbourgWeatherWidget));

  }

  onWidgetUpdate(w: Widget) {
    this.store.dispatch(new appActions.UpdateWidget(w))
  }

  onCryptoWidgetAdd(w: CryptoWidget){
    const widget = new CryptoWidget(w.inCurrency, w.outCurrency)
    this.store.dispatch(new appActions.AddWidget(widget));
    this.showCryptoForm = false;
  }

  onWeatherWidgetAdd(city: string){
    const widget = new WeatherWidget(city);
    this.store.dispatch(new appActions.AddWidget(widget));
    this.showWeatherForm = false;
  }

  onWidgetClose(w: Widget){
    this.store.dispatch(new appActions.RemoveWidget(w.id));
  }
}
