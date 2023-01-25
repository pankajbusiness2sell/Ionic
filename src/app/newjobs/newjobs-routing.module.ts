import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewjobsPage } from './newjobs.page';

const routes: Routes = [
  {
    path: '',
    component: NewjobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewjobsPageRoutingModule {}
