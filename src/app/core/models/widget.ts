import * as uuid from 'uuid/v4';

export interface Widget {
  readonly id: string;
  readonly type: 'crypto' | 'weather';
}


export class CryptoWidget implements Widget {

  readonly type = 'crypto';
  readonly id: string;

  constructor(public inCurrency: string,
              public outCurrency: string,
              public price: number = 0) {
    this.id = uuid();
  }
}

export class WeatherWidget implements Widget {

  readonly type = 'weather';
  readonly id: string;

  constructor(public city: string,
              public min: number = 0,
              public max: number = 0) {
    this.id = uuid();
  }
}

