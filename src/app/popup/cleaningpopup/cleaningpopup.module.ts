import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CleaningpopupPageRoutingModule } from './cleaningpopup-routing.module';

import { CleaningpopupPage } from './cleaningpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CleaningpopupPageRoutingModule
  ],
  declarations: [CleaningpopupPage]
})
export class CleaningpopupPageModule {}
