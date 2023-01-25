import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsubstaffPageRoutingModule } from './addsubstaff-routing.module';

import { AddsubstaffPage } from './addsubstaff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsubstaffPageRoutingModule
  ],
  declarations: [AddsubstaffPage]
})
export class AddsubstaffPageModule {}
