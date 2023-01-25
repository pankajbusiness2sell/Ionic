import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpsellPage } from './upsell.page';

const routes: Routes = [
  {
    path: '',
    component: UpsellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpsellPageRoutingModule {}
