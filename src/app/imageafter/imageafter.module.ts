import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageafterPageRoutingModule } from './imageafter-routing.module';

import { ImageafterPage } from './imageafter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageafterPageRoutingModule
  ],
  declarations: [ImageafterPage]
})
export class ImageafterPageModule {}
