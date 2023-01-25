import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagebeforePageRoutingModule } from './imagebefore-routing.module';

import { ImagebeforePage } from './imagebefore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagebeforePageRoutingModule
  ],
  declarations: [ImagebeforePage]
})
export class ImagebeforePageModule {}
