import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EveningcheckpopupPage } from './eveningcheckpopup.page';

const routes: Routes = [
  {
    path: '',
    component: EveningcheckpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EveningcheckpopupPageRoutingModule {}
