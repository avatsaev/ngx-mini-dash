import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {environment} from '../../../environments/environment';

@Injectable()
export class CryptoCurrencyService {

  constructor(private http: HttpClient) { }


  getBtcPrice(outCurrency = 'USD'): Observable<{price: number, outCurrency: string}> {
    return this.http
        .get(`${environment.cryptoCurrencyApiConf.url}/price?fsym=BTC&tsyms=${outCurrency}`)
        .pipe(
            map(r => ({
                price: r[outCurrency],
                outCurrency
            }))
        );
  }

  getEthPrice(outCurrency = 'USD'): Observable<{price: number, outCurrency: string}> {
      return this.http.get(`${environment.cryptoCurrencyApiConf.url}/price?fsym=ETH&tsyms=${outCurrency}`).pipe(
            map(r => ({
                price: r[outCurrency],
                outCurrency
            }))
      );
  }

}
