import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CryptoWidget} from '../../models/widget';
import {timer} from 'rxjs/observable/timer';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'crypto-widget',
  template: `


    <p class="title">
      {{widget.price}} {{widget.outCurrency}}
    </p>
    <p class="subtitle">1 {{widget.inCurrency}}</p>


  `,
  host: {class: 'tile is-child box'}
})
export class CryptoWidgetComponent implements OnInit, OnDestroy{

  @Input() widget: CryptoWidget;
  @Input() refreshInterval = 3000;
  @Output() onUpdate = new EventEmitter<CryptoWidget>();
  refreshSub: Subscription;


  ngOnInit() {
    this.refreshSub = timer(0, this.refreshInterval)
      .subscribe(_ => this.onUpdate.emit(this.widget));
  }

  ngOnDestroy(){
    this.refreshSub.unsubscribe();
  }

}
