import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CryptoCurrencyService {

  constructor(private http: HttpClient) {
  }

  getPrice(inCurrency: string, outCurrency: string): Observable<number> {
    return this.http
      .get(`${environment.cryptoCurrencyApiConf.url}/price?fsym=${inCurrency}&tsyms=${outCurrency}`)
      .pipe(
        map(r => r[outCurrency])
      );
  }

}
