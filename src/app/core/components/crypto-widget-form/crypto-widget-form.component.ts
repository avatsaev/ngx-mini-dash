import {Component, EventEmitter, Output} from '@angular/core';
import {CryptoWidget} from '../../models/widget';

@Component({
  selector: 'crypto-widget-form',
  template: `
    <div class="form">

      <div class="field is-grouped">
        <p class="control is-expanded">
          <input [(ngModel)]="widget.inCurrency"  class="input" type="text" placeholder="Input currency (ETH, BTC...)">
        </p>

        <p class="control is-expanded">
          <input [(ngModel)]="widget.outCurrency" class="input" type="text" placeholder="Output currency (USD, EUR...)">
        </p>
        
        <p class="control">

          <a (click)="onCancel.emit()" class="button is-danger">
            CANCEL
          </a>
          
          <a (click)="onSubmitClick()" class="button is-success">
           ADD
          </a>

          
        </p>
      </div>
    </div>
      

  
    
  `,
  styles: [`
    .form{
      margin-bottom: 30px;
      animation: fadein 0.7s;
    }
    
    @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `]
})

export class CryptoWidgetFormComponent{

  @Output() onSubmit = new EventEmitter<Partial<CryptoWidget>>();
  @Output() onCancel = new EventEmitter<void>();
  widget: CryptoWidget = new CryptoWidget('', '');


  onSubmitClick(){

    this.onSubmit.emit({
      inCurrency:  this.widget.inCurrency.toUpperCase(),
      outCurrency: this.widget.outCurrency.toUpperCase()
    } as CryptoWidget);
    this.widget.outCurrency = '';
    this.widget.inCurrency = '';
  }

}
