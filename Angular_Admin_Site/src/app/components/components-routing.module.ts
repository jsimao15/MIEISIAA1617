import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './eventos.component';
import { CanaisComponent } from './canais.component';
import { ConteudoComponent } from './conteudo.component';
import { ClientesComponent } from './clientes.component';
import { PlayersComponent } from './players.component';
import { RedesComponent } from './redes.component';
import { ButtonsComponent } from './buttons.component';
import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { ModalsComponent } from './modals.component';
import { SocialButtonsComponent } from './social-buttons.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Components'
    },
    children: [
      {
        path: 'eventos',
        component: EventosComponent,
        data: {
          title: 'Eventos'
        }
      },
      {
        path: 'canais',
        component: CanaisComponent,
        data: {
          title: 'Canais'
        }
      },
      {
        path: 'conteudo',
        component: ConteudoComponent,
        data: {
          title: 'Conteudo'
        }
      },
      {
        path: 'players',
        component: PlayersComponent,
        data: {
          title: 'Players'
        }
      },
      {
        path: 'redes',
        component: RedesComponent,
        data: {
          title: 'Redes'
        }
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        data: {
          title: 'Clientes'
        }
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
          title: 'Buttons'
        }
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Cards'
        }
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },
      {
        path: 'modals',
        component: ModalsComponent,
        data: {
          title: 'Modals'
        }
      },
      {
        path: 'social-buttons',
        component: SocialButtonsComponent,
        data: {
          title: 'Social buttons'
        }
      },
      {
        path: 'switches',
        component: SwitchesComponent,
        data: {
          title: 'Switches'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
