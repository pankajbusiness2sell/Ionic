import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecleanPage } from './reclean.page';

const routes: Routes = [
  {
    path: '',
    component: RecleanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecleanPageRoutingModule {}
