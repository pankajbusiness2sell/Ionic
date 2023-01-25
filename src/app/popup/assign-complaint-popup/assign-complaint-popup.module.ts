import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignComplaintPopupPageRoutingModule } from './assign-complaint-popup-routing.module';

import { AssignComplaintPopupPage } from './assign-complaint-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignComplaintPopupPageRoutingModule
  ],
  declarations: [AssignComplaintPopupPage]
})
export class AssignComplaintPopupPageModule {}
