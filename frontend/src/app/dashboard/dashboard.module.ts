import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '', component:
    DashboardComponent,

    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },

      {
        path: 'main',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
      },
      {
        path: 'clients',
        loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule),
      },
      {
        path: 'routers',
        loadChildren: () => import('./modules/routers/routers.module').then(m => m.RoutersModule),
      },
      {
        path: 'dictionary',
        loadChildren: () => import('./modules/dictionary/dictionary.module').then(m => m.DictionaryModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
      },

    ],
  },
];


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
  ],

})
export class DashboardModule { }
