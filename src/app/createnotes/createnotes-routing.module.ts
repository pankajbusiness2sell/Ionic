import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatenotesPage } from './createnotes.page';

const routes: Routes = [
  {
    path: '',
    component: CreatenotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatenotesPageRoutingModule {}
