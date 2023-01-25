import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleaningpopupPage } from './cleaningpopup.page';

const routes: Routes = [
  {
    path: '',
    component: CleaningpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleaningpopupPageRoutingModule {}
