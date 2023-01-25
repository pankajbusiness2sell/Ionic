import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobstartpopupPage } from './jobstartpopup.page';

const routes: Routes = [
  {
    path: '',
    component: JobstartpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobstartpopupPageRoutingModule {}
