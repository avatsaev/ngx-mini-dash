
import {Component, OnInit} from '@angular/core';
import * as appActions from './core/store/app.actions';
import * as fromRoot from './core/store';
import {Store} from '@ngrx/store';
import {CryptoWidget, WeatherWidget, Widget} from './core/models/widget';
import {Observable} from 'rxjs/Observable';


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
              <h2 class="subtitle" style="font-size: 14px">
                Try adding some weather or crypto currency widgets, they will update in real time.
              </h2>
            </div>
          </div>
        </section>

        <div class="tile is-ancestor has-text-centered">
          
          <div class="tile is-parent" *ngFor="let w of widgets$ | async; trackBy: widgetsTrackByfn">
  
            <crypto-widget *ngIf="w.type =='crypto'" 
                           [widget]="w" 
                           [refreshInterval]="2000"
                           (onUpdate)="onWidgetUpdate($event)" 
            ></crypto-widget>
  
            <weather-widget *ngIf="w.type =='weather'"
                            [widget]="w" 
                            [refreshInterval]="60000" 
                            (onUpdate)="onWidgetUpdate($event)"
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
  `]
})
export class AppComponent implements OnInit {

  widgets$: Observable<Widget[]>;
  widgetsTrackByfn = (w: Widget) => w.id;


  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {

    this.widgets$ = this.store.select(fromRoot.getAllWidgets);

    const ethWidget = new CryptoWidget('ETH', 'EUR');
    const btcWidget = new CryptoWidget('BTC', 'EUR');
    const strasbourgWeatherWidget = new WeatherWidget('Strasbourg');

    this.store.dispatch(new appActions.AddWidget(ethWidget));
    this.store.dispatch(new appActions.AddWidget(btcWidget));
    this.store.dispatch(new appActions.AddWidget(strasbourgWeatherWidget));

  }


  onWidgetUpdate(w: Widget) {
    this.store.dispatch(new appActions.UpdateWidget(w))
  }
}
