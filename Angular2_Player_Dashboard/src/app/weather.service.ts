import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Weather } from './weather';


@Injectable()
export class WeatherService{
  constructor(private http : Http){
  }


  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  getWeather(url: string): Observable<Weather> {
      
    let weather$ = this.http
      .get(url, {headers: this.getHeaders()})
      .map(mapWeather)
      .catch(handleError);
      return weather$;
  }

}

function toWeather(r:any): Weather{
    let weather = <Weather>({
        cidade: "Braga",
        temp: Number.parseFloat(r.query.results.channel.item.condition.temp),
        texto: r.query.results.channel.item.condition.text
    });
    console.log('Parsed Player:', weather);
    return weather;
}

function mapWeather(response:Response): Weather{
   // toCanal looks just like in the previous example
   return toWeather(response.json());
}

// this could also be a private method of the component classqui
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(JSON.parse(errorMsg));

  // throw an application level error
  return Observable.throw(errorMsg);
}