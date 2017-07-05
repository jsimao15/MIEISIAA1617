import { Component, OnInit, Input,animate } from '@angular/core';
import { Router } from '@angular/router';
import { Canal } from '../canal';
import { CanalService } from "../canal.service";
import { AuthServ } from "../auth.service";
import { Player } from '../player';
import { PlayerService } from "../player.service";
import { Weather } from '../weather';
import { WeatherService } from "../weather.service";
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import {StoreDataService} from '../storageData.service';

@Component({
  templateUrl: 'dashboard.component.html'

})
export class DashboardComponent implements OnInit {
  canal : Canal;
  tempo : Weather;
  img : String[] = [];
  isLoadingIMG: boolean = true;
  video :any;
  isLoadingVideo: boolean = true;
  feedRss : String[] = [];
  isLoadingFeedRSS: boolean = true;
  meteo : string[] = [];
  isLoadingMeteo: boolean = true;
  errorMessage: string = '';
  isLoading: boolean = true;
  player : Player[] = [];
  errorMessageP: string = '';
  isLoadingP: boolean = true;

  constructor(private storeDataService: StoreDataService,private route:ActivatedRoute,private canalService: CanalService,private playerService: PlayerService,private weatherService: WeatherService,private authService: AuthServ,private _sanitizer: DomSanitizer) { 
  
  animate(10000000);
  
    this.canalService
      .get(localStorage.getItem('playerID'))
      .subscribe(
          p => {
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
           e => this.errorMessage = e,
          () => this.isLoading = false);
         
    this.playerService.getAll().subscribe(
           p => this.player = p,
          e => this.errorMessageP = e,
          () => this.isLoadingP = false);
        
    
  }


  ngOnInit(){}
  
}
