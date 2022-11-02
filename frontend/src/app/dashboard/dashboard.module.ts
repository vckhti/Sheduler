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
        path: 'account',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
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
