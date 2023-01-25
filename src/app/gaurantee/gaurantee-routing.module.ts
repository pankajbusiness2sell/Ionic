import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GauranteePage } from './gaurantee.page';

const routes: Routes = [
  {
    path: '',
    component: GauranteePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GauranteePageRoutingModule {}
