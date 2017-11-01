
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {WeatherWidget} from '../../models/widget';
import {Subscription} from 'rxjs/Subscription';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'weather-widget',
  template: `    
    <p class="title">{{widget.min}}°C - {{widget.max}}°C</p>
    <p class="subtitle">Weather in {{widget.city}}</p>
  `,
  host: {class: 'tile is-child box'}
})

export class WeatherWidgetComponent implements OnInit, OnDestroy{

  @Input() widget: WeatherWidget;
  @Input() refreshInterval = 3000;
  @Output() onUpdate = new EventEmitter<WeatherWidget>();
  refreshSub: Subscription;



  ngOnInit() {
    this.refreshSub = timer(0, this.refreshInterval)
      .subscribe(_ => this.onUpdate.emit(this.widget));
  }

  ngOnDestroy(){
    this.refreshSub.unsubscribe();
  }

}
