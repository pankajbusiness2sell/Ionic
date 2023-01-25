import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydetailPage } from './mydetail.page';

const routes: Routes = [
  {
    path: '',
    component: MydetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MydetailPageRoutingModule {}
