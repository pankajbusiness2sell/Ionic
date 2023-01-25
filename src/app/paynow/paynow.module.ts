import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaynowPageRoutingModule } from './paynow-routing.module';

import { PaynowPage } from './paynow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaynowPageRoutingModule
  ],
  declarations: [PaynowPage]
})
export class PaynowPageModule {}
