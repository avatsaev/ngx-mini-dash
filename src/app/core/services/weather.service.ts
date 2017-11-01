import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators/map';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {}

  getCityWeather(city: string): Observable<{ min: number, max: number }> {
    return this.http
      .get(`${environment.weatherApiConf.url}/weather?q=${city}&units=metric&appid=${environment.weatherApiConf.appId}`)
      .pipe(
        map(r => ({
          min: r['main']['temp_min'],
          max: r['main']['temp_max']
        }))
      );
  }

}
