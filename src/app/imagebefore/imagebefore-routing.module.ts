import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagebeforePage } from './imagebefore.page';

const routes: Routes = [
  {
    path: '',
    component: ImagebeforePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagebeforePageRoutingModule {}
