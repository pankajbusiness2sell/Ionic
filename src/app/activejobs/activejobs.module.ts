import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivejobsPageRoutingModule } from './activejobs-routing.module';

import { ActivejobsPage } from './activejobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivejobsPageRoutingModule
  ],
  declarations: [ActivejobsPage]
})
export class ActivejobsPageModule {}
