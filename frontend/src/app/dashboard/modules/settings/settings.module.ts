import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import {RouterModule, Routes} from "@angular/router";
import {DictionaryComponent} from "../dictionary/components/dictionary/dictionary.component";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  }
];


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
