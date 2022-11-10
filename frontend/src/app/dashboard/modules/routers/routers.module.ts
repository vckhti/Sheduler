import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutersComponent } from './components/routers/routers.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {LoadingModule} from "../../../shared/modules/loading/loading.module";
import {DefaultDialogComponent} from "./components/default-dialog/default-dialog.component";
import {RegisterEffect} from "./store/register.effect";
import {reducers} from "./store/reducers";
import {PaginationModule} from "../../../shared/modules/pagination/pagination.module";
import {DictionaryService} from "./services/dictionary.service";

const routes: Routes = [
  {
    path: '',
    component: RoutersComponent,
  }
];


@NgModule({
  declarations: [
    RoutersComponent,
    DefaultDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PaginationModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('routers', reducers),
    EffectsModule.forFeature([RegisterEffect]),
    LoadingModule

  ],
  providers: [
    DictionaryService
]
})
export class RoutersModule { }
