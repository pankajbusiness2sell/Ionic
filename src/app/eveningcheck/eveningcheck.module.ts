import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EveningcheckPageRoutingModule } from './eveningcheck-routing.module';

import { EveningcheckPage } from './eveningcheck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EveningcheckPageRoutingModule
  ],
  declarations: [EveningcheckPage]
})
export class EveningcheckPageModule {}
