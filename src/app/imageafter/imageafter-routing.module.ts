import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageafterPage } from './imageafter.page';

const routes: Routes = [
  {
    path: '',
    component: ImageafterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageafterPageRoutingModule {}
