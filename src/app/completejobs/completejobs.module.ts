import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletejobsPageRoutingModule } from './completejobs-routing.module';

import { CompletejobsPage } from './completejobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletejobsPageRoutingModule
  ],
  declarations: [CompletejobsPage]
})
export class CompletejobsPageModule {}
