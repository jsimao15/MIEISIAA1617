import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Canal } from './canal';


@Injectable()
export class AuthServ{
  private baseUrl: string = 'http://localhost:8080/dsignage/rest';
  constructor(private http : Http){
  }

  getCanalByAuth(user: string,p: string): Observable<Canal>{
    let canal$ = this.http
      .get(`${this.baseUrl}/player/login/${user}/${p}`, { headers: this.getHeaders()})
      .map(mapCanal)
      .catch(handleError);
      return canal$;
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  get(id: number): Observable<Canal> {
    let canal$ = this.http
      .get(`${this.baseUrl}/canal/${id}`, {headers: this.getHeaders()})
      .map(mapCanal)
      .catch(handleError);
      return canal$;
  }

  save(canal: Canal) : Observable<Response>{
    // this won't actually work because the StarWars API doesn't 
    // is read-only. But it would look like this:
    return this
      .http
      .put(`${this.baseUrl}/canal/${canal.id}`, 
            JSON.stringify(canal), 
            {headers: this.getHeaders()});
  }

}


function mapCanais(response:Response): Canal[]{
  //throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results
  return response.json().map(toCanal)
}

function toCanal(r:any): Canal{
    
    console.log('OLA:', r);
    let auxConteudo: Array<{
    idCont:number,
    url: string,
    tipo: string}> = [];
    for (let entry of r.conteudos)
    {
        console.log('push:', entry.tipo.descricao);
        auxConteudo.push(
            {idCont: entry.idConteudo,
             url: entry.url,
             tipo: entry.tipo.descricao});
        
        console.log('pushado:', auxConteudo);
    }
    let canal = <Canal>({
        id: r.id,
        descricao: r.descricao,
        nome: r.nome,
        conteudo: auxConteudo
        //height: Number.parseInt(r.height)
    });
    console.log('Parsed canal:', canal);
    return canal;
}

// to avoid breaking the rest of our app
// I extract the id from the canal url
function extractId(canalData:any){
  let extractedId = canalData.url.replace(this.baseUrl +'/','').replace('/','');
  return parseInt(extractedId);
}

function mapCanal(response:Response): Canal{
console.log("Sup");                 
   // toCanal looks just like in the previous example
   return toCanal(response.json());
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