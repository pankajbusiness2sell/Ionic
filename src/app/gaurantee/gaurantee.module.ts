import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GauranteePageRoutingModule } from './gaurantee-routing.module';

import { GauranteePage } from './gaurantee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GauranteePageRoutingModule
  ],
  declarations: [GauranteePage]
})
export class GauranteePageModule {}
