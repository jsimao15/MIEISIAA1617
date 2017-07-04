import { NgModule } from '@angular/core';
import { EventosComponent } from './eventos.component';
import { CanaisComponent } from './canais.component';
import { PlayersComponent } from './players.component';
import { ConteudoComponent } from './conteudo.component';
import { ClientesComponent } from './clientes.component';
import { RedesComponent } from './redes.component';
import { ButtonsComponent } from './buttons.component';
import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SocialButtonsComponent } from './social-buttons.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';

// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from './modals.component';

// Tabs Component
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Components Routing
import { ComponentsRoutingModule } from './components-routing.module';

@NgModule({
  imports: [
    ComponentsRoutingModule,
    ModalModule.forRoot(),
    TabsModule
  ],
  declarations: [
    EventosComponent,
    CanaisComponent,
    ConteudoComponent,
    PlayersComponent,
    RedesComponent,
    ClientesComponent,
    ButtonsComponent,
    CardsComponent,
    FormsComponent,
    ModalsComponent,
    SocialButtonsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent
  ]
})
export class ComponentsModule { }
