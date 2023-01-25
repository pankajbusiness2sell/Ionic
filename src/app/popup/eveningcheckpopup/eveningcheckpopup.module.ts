import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EveningcheckpopupPageRoutingModule } from './eveningcheckpopup-routing.module';

import { EveningcheckpopupPage } from './eveningcheckpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EveningcheckpopupPageRoutingModule
  ],
  declarations: [EveningcheckpopupPage]
})
export class EveningcheckpopupPageModule {}
