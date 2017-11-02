import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {CryptoWidget} from '../../models/widget';
import {timer} from 'rxjs/observable/timer';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'crypto-widget',
  template: `   
    <div class="widget-container">
      <p class="title">
        {{widget.price}} {{widget.outCurrency}}
      </p>
      <p class="subtitle">1 {{widget.inCurrency}}</p>
    </div>
  `,
  host: {
    class: 'tile is-child box',
    '[class.down]': 'isDown',
    '[class.up]': '!isDown'
  },
  styles: [`
    :host(.down){
      background-color: #CF3A24;
      transition: background 0.3s ease;
    }

    :host(.up){
      background-color: #26c281;
      transition: background 0.3s ease;
    }
    
    p{
      color: #eee;
      text-shadow: 0px 2px 0px rgba(0,0,0, 0.3)
    }
    
  `]
})

export class CryptoWidgetComponent implements OnInit, OnDestroy, OnChanges{

  @Input() widget: CryptoWidget;
  @Input() refreshInterval = 3000;
  @Output() onUpdate = new EventEmitter<CryptoWidget>();
  isDown = true;
  refreshSub: Subscription;


  ngOnInit() {
    this.refreshSub = timer(0, this.refreshInterval)
      .subscribe(_ => this.onUpdate.emit(this.widget));
  }

  ngOnDestroy(){
    this.refreshSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isDown = (changes.widget.previousValue && changes.widget.currentValue.price < changes.widget.previousValue.price)
  }

}
