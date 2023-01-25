import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatequotePage } from './createquote.page';

const routes: Routes = [
  {
    path: '',
    component: CreatequotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatequotePageRoutingModule {}
