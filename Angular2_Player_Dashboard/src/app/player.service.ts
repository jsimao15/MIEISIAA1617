import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Player } from './player';

/*const CANAL : Canal[] = [
      {id: 1, descricao: 'descricao do Canal1', nome: 'nome do canal1', conteudo: [{idCont : 1,url: 'jn.pt',tipo:'tipo do conteudo1'}]},
      {id: 2, descricao: 'descricao do Canal2', nome: 'nome do canal2', conteudo: [{idCont : 2,url: 'ojogo.pt',tipo:'tipo do conteudo2'}]},
      {id: 3, descricao: 'descricao do Canal3', nome: 'nome do canal3', conteudo: [{idCont : 3,url: 'aaaaa.pt',tipo:'tipo do conteudo3'}]}
];*/

@Injectable()
export class PlayerService{
  private baseUrl: string = 'http://localhost:8080/dsignage/rest';
  constructor(private http : Http){
  }

  getAll(): Observable<Player[]>{
    let player$ = this.http
      .get(`${this.baseUrl}/player`, { headers: this.getHeaders()})
      .map(mapPlayers)
      .catch(handleError);
      return player$;
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  get(id: number): Observable<Player> {
    let player$ = this.http
      .get(`${this.baseUrl}/player/${id}`, {headers: this.getHeaders()})
      .map(mapPlayer)
      .catch(handleError);
      
  console.log(player$);
      return player$;
  }

  save(player: Player) : Observable<Response>{
    // this won't actually work because the StarWars API doesn't 
    // is read-only. But it would look like this:
    return this
      .http
      .put(`${this.baseUrl}/player/${player.id}`, 
            JSON.stringify(player), 
            {headers: this.getHeaders()});
  }

}


function mapPlayers(response:Response): Player[]{
  //throw new Error('ups! Force choke!');

  // The response of the API has a results
  // property with the actual results
  return response.json().map(toPlayer)
}

function toPlayer(r:any): Player{
    let player = <Player>({
        id: r.idPlayer,
        nome: r.nome,
        descricao: r.descricao,
        latitude: r.latitude,
        longitude: r.longitude
    });
    console.log('Parsed Player:', player);
    return player;
}

// to avoid breaking the rest of our app
// I extract the id from the canal url
function extractId(canalData:any){
  let extractedId = canalData.url.replace(this.baseUrl +'/','').replace('/','');
  return parseInt(extractedId);
}

function mapPlayer(response:Response): Player{
   // toCanal looks just like in the previous example
   return toPlayer(response.json());
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