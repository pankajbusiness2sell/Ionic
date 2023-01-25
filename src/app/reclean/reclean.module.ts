import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecleanPageRoutingModule } from './reclean-routing.module';

import { RecleanPage } from './reclean.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecleanPageRoutingModule
  ],
  declarations: [RecleanPage]
})
export class RecleanPageModule {}
