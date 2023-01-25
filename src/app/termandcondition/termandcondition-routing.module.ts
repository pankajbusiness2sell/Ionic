import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermandconditionPage } from './termandcondition.page';

const routes: Routes = [
  {
    path: '',
    component: TermandconditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermandconditionPageRoutingModule {}
