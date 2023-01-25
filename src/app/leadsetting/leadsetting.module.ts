import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadsettingPageRoutingModule } from './leadsetting-routing.module';

import { LeadsettingPage } from './leadsetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadsettingPageRoutingModule
  ],
  declarations: [LeadsettingPage]
})
export class LeadsettingPageModule {}
