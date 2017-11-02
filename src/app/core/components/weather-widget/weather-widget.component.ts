
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {WeatherWidget, Widget} from '../../models/widget';
import {Subscription} from 'rxjs/Subscription';
import {timer} from 'rxjs/observable/timer';

@Component({
  selector: 'weather-widget',
  template: `
    <span (click)="onClose.emit(this.widget)" style="margin-top: -10px" class="is-pulled-right">
      <i style="color: #555; cursor: pointer" class="fa fa-times-circle-o" aria-hidden="true"></i>
    </span>
    <div class="widget-container">
      <p class="title">
        {{widget.min}}°C 
        <span *ngIf="widget.min !== widget.max">/ {{widget.max}}°C</span>
      </p>
      <p class="subtitle">Weather in {{widget.city}}</p>
    </div>

  `,
  host: {class: 'tile is-child box'}
})

export class WeatherWidgetComponent implements OnInit, OnDestroy{

  @Input() widget: WeatherWidget;
  @Input() refreshInterval = 3000;
  @Output() onUpdateRequest = new EventEmitter<WeatherWidget>();
  @Output() onClose = new EventEmitter<Widget>();

  refreshSub: Subscription;



  ngOnInit() {
    this.refreshSub = timer(0, this.refreshInterval)
      .subscribe(_ => this.onUpdateRequest.emit(this.widget));
  }

  ngOnDestroy(){
    this.refreshSub.unsubscribe();
  }

}
