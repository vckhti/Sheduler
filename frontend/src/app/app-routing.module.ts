import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 /* {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule),
  },
  {
    path: 'conference',
    loadChildren: () => import('./modules/conference/conference.module').then(mod => mod.ConferenceModule),
  },*/
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
  },
 /* {
    path: '**',
    component: NotFoundComponent,
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
