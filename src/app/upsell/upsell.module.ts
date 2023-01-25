import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpsellPageRoutingModule } from './upsell-routing.module';

import { UpsellPage } from './upsell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpsellPageRoutingModule
  ],
  declarations: [UpsellPage]
})
export class UpsellPageModule {}
