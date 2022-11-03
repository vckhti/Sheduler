import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutersComponent } from './components/routers/routers.component';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "../main/components/main/main.component";

const routes: Routes = [
  {
    path: '',
    component: RoutersComponent,
  }
];


@NgModule({
  declarations: [
    RoutersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class RoutersModule { }
