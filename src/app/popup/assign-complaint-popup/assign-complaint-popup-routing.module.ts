import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignComplaintPopupPage } from './assign-complaint-popup.page';

const routes: Routes = [
  {
    path: '',
    component: AssignComplaintPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignComplaintPopupPageRoutingModule {}
