import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubstaffPage } from './substaff.page';

const routes: Routes = [
  {
    path: '',
    component: SubstaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubstaffPageRoutingModule {}
