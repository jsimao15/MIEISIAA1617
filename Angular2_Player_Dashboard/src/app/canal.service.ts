import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Canal } from './canal';

/*const CANAL : Canal[] = [
      {id: 1, descricao: 'descricao do Canal1', nome: 'nome do canal1', conteudo: [{idCont : 1,url: 'jn.pt',tipo:'tipo do conteudo1'}]},
      {id: 2, descricao: 'descricao do Canal2', nome: 'nome do canal2', conteudo: [{idCont : 2,url: 'ojogo.pt',tipo:'tipo do conteudo2'}]},
      {id: 3, descricao: 'descricao do Canal3', nome: 'nome do canal3', conteudo: [{idCont : 3,url: 'aaaaa.pt',tipo:'tipo do conteudo3'}]}
];*/

@Injectable()
export class CanalService{
  private baseUrl: string = 'http://localhost:8080/dsignage/rest';
  constructor(private http : Http){
  }

  getAll(): Observable<Canal[]>{
    let canal$ = this.http
      .get(`${this.baseUrl}/canal`, { headers: this.getHeaders()})
      .map(mapCanais)
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
        id: r.idConteudo,
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