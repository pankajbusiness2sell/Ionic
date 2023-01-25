import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydetailPageRoutingModule } from './mydetail-routing.module';

import { MydetailPage } from './mydetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MydetailPageRoutingModule
  ],
  declarations: [MydetailPage]
})
export class MydetailPageModule {}
