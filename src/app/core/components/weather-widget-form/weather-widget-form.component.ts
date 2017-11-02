import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'weather-widget-form',
  template: `
    <div class="form">

      <div class="field is-grouped">
        <p class="control is-expanded">
          <input [(ngModel)]="city" class="input" type="text" placeholder="City (London, Strasbourg, New York...)">
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

export class WeatherWidgetFormComponent{

  @Output() onSubmit = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  city: string = '';

  onSubmitClick() {
    this.onSubmit.emit(this.city);
    this.city = '';
  }

}
