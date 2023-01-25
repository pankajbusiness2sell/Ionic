import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletejobsPage } from './completejobs.page';

const routes: Routes = [
  {
    path: '',
    component: CompletejobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletejobsPageRoutingModule {}
