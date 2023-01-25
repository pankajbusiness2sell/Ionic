import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecleancheckpopupPage } from './recleancheckpopup.page';

const routes: Routes = [
  {
    path: '',
    component: RecleancheckpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecleancheckpopupPageRoutingModule {}
