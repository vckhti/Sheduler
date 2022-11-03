import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './components/clients/clients.component';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "../main/components/main/main.component";

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
  }
];


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientsModule { }
