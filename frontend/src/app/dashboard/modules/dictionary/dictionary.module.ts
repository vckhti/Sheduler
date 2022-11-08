import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import {RouterModule, Routes} from "@angular/router";
import { RegionsComponent } from './components/regions/regions.component';
import { PointsComponent } from './components/points/points.component';
import { SpeedsComponent } from './components/speeds/speeds.component';
import { TypeofportsComponent } from './components/typeofports/typeofports.component';
import { TypeoftrafficComponent } from './components/typeoftraffic/typeoftraffic.component';
import { TypeofclientsComponent } from './components/typeofclients/typeofclients.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {reducers} from "./store/reducers";
import {RegisterEffect} from "./store/register.effect";
import { DefaultDialogComponent } from './components/default-dialog/default-dialog.component';
import {FormsModule} from "@angular/forms";
import {LoadingModule} from "../../../shared/modules/loading/loading.module";


const routes: Routes = [
  {
    path: '', component:
    DictionaryComponent,
    children: [
      {
        path: '',
        redirectTo: 'regions',
        pathMatch: 'full'
      },
      {
        path: 'regions',
        component: RegionsComponent,
      },
      {
        path: 'points',
        component: PointsComponent,
      },
      {
        path: 'speeds',
        component: SpeedsComponent,
      },
      {
        path: 'typeofports',
        component: TypeofportsComponent,
      },
      {
        path: 'typeoftraffic',
        component: TypeoftrafficComponent,
      },
      {
        path: 'typeofclients',
        component: TypeofclientsComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    DictionaryComponent,
    RegionsComponent,
    PointsComponent,
    SpeedsComponent,
    TypeofportsComponent,
    TypeoftrafficComponent,
    TypeofclientsComponent,
    DefaultDialogComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
    LoadingModule
  ]
})
export class DictionaryModule { }
