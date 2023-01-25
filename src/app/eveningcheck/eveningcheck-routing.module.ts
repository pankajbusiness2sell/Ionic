import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EveningcheckPage } from './eveningcheck.page';

const routes: Routes = [
  {
    path: '',
    component: EveningcheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EveningcheckPageRoutingModule {}
