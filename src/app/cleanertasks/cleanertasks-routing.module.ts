import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleanertasksPage } from './cleanertasks.page';

const routes: Routes = [
  {
    path: '',
    component: CleanertasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleanertasksPageRoutingModule {}
