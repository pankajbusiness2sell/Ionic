import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivejobsPage } from './activejobs.page';

const routes: Routes = [
  {
    path: '',
    component: ActivejobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivejobsPageRoutingModule {}
