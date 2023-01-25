import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignRecleanPopupPage } from './assign-reclean-popup.page';

const routes: Routes = [
  {
    path: '',
    component: AssignRecleanPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignRecleanPopupPageRoutingModule {}
