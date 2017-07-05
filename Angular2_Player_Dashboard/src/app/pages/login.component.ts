import { Component } from '@angular/core';

import { Canal } from '../canal';
import { Weather } from '../weather';
import { AuthServ } from "../auth.service";

import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {StoreDataService} from '../storageData.service';

@Component({
  templateUrl: 'login.component.html'
})
@Injectable()
export class LoginComponent {
  private router:Router;
  idc:number;
  isDone=false;
  user:string="";
  password:string="";
  canal : Canal=null;
  img : String[] = [];
  isLoadingIMG: boolean = true;
  video :any;
  isLoadingVideo: boolean = true;
  feedRss : String[] = [];
  isLoadingFeedRSS: boolean = true;
  isLoadingMeteo: boolean = true;
  errorMessage: string = '';
  isLoading: boolean = true;
  meteo : string[] = [];
  tempo : Weather;
  returnUrl: string;
  constructor(private authService: AuthServ,private _sanitizer: DomSanitizer, router:Router,
        private route: ActivatedRoute,private storeDataService: StoreDataService) { 

  }
  ngOnInit() {
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        localStorage.clear();
          if(localStorage.getItem('playerID'))
          {
            localStorage.removeItem('playerID');
            console.log("limpou");
          }
    }
private login(){
this.authService
      .getCanalByAuth(this.user,this.password)
      .subscribe(
         /* happy path*/  p => {
                            this.idc=p.id;
                            this.canal = p;
                            for (let conteudo of (this.canal.conteudo))
                            {
                              if(conteudo.tipo == "Fedd RSS")
                              {
                                this.feedRss.push(conteudo.url);
                                this.isLoadingFeedRSS= false;
                              }
                              else if(conteudo.tipo == "Video")
                              {
                                this.video = this._sanitizer.bypassSecurityTrustResourceUrl(conteudo.url.replace("watch?v=","embed/")+"?autoplay=1");
                                this.isLoadingVideo= false;
                              }
                              else if(conteudo.tipo == "Imagem")
                              {
                                this.img.push(conteudo.url);
                                this.isLoadingIMG= false;
                              }
                              else if(conteudo.tipo == "Meteo")
                              {
                                this.meteo.push(conteudo.url);
                                this.isLoadingMeteo= false;
                              }
                            }
                            if (!this.isLoadingMeteo)
                            {
                              this.tempo = {cidade:"Braga",temp:27,texto:"Partly Cloudy"}
                              /*this.weatherService.getWeather(this.meteo[0]).subscribe(
                                                      p => {
                                                            this.tempo = p;
                                                            //this.tempo.temp = (parseFloat(parseFloat(this.tempo.temp) − 32.0) / 1.8;
                                                      },
                                                       e => this.errorMessageP = e,
                                                       () => this.isLoadingP = false);*/
                            }
                        },
         /* error path*/  e => this.errorMessage = e,
         /* onCompleted*/ () => {this.isLoading = false
         if(!this.errorMessage)
         {
          this.storeDataService.storedData = this.canal;
          localStorage.clear();
          while(localStorage.getItem('playerID'))
            localStorage.removeItem('playerID');
          localStorage.setItem('playerID',JSON.stringify(this.idc));
          
          this.isDone = true;
          //this.router.navigate(['dashboard']);
         }
         });
  }
}
