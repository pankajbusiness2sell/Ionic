import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecleancheckpopupPageRoutingModule } from './recleancheckpopup-routing.module';

import { RecleancheckpopupPage } from './recleancheckpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecleancheckpopupPageRoutingModule
  ],
  declarations: [RecleancheckpopupPage]
})
export class RecleancheckpopupPageModule {}
