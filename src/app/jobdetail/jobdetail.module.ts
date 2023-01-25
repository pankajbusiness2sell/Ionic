import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobdetailPageRoutingModule } from './jobdetail-routing.module';

import { JobdetailPage } from './jobdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobdetailPageRoutingModule
  ],
  declarations: [JobdetailPage]
})
export class JobdetailPageModule {}
