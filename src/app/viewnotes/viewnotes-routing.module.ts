import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewnotesPage } from './viewnotes.page';

const routes: Routes = [
  {
    path: '',
    component: ViewnotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewnotesPageRoutingModule {}
