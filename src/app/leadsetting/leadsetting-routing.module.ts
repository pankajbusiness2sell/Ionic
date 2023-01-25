import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadsettingPage } from './leadsetting.page';

const routes: Routes = [
  {
    path: '',
    component: LeadsettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadsettingPageRoutingModule {}
