import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadsPageRoutingModule } from './leads-routing.module';

import { LeadsPage } from './leads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadsPageRoutingModule
  ],
  declarations: [LeadsPage]
})
export class LeadsPageModule {}
