import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobdetailPage } from './jobdetail.page';

const routes: Routes = [
  {
    path: '',
    component: JobdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobdetailPageRoutingModule {}
