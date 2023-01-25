import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewjobsPageRoutingModule } from './newjobs-routing.module';

import { NewjobsPage } from './newjobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewjobsPageRoutingModule
  ],
  declarations: [NewjobsPage]
})
export class NewjobsPageModule {}
