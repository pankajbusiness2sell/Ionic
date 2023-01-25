import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignRecleanPopupPageRoutingModule } from './assign-reclean-popup-routing.module';

import { AssignRecleanPopupPage } from './assign-reclean-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignRecleanPopupPageRoutingModule
  ],
  declarations: [AssignRecleanPopupPage]
})
export class AssignRecleanPopupPageModule {}
