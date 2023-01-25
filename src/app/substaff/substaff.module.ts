import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubstaffPageRoutingModule } from './substaff-routing.module';

import { SubstaffPage } from './substaff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubstaffPageRoutingModule
  ],
  declarations: [SubstaffPage]
})
export class SubstaffPageModule {}
