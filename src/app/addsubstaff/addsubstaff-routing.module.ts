import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsubstaffPage } from './addsubstaff.page';

const routes: Routes = [
  {
    path: '',
    component: AddsubstaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsubstaffPageRoutingModule {}
