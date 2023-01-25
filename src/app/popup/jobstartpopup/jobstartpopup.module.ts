import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobstartpopupPageRoutingModule } from './jobstartpopup-routing.module';

import { JobstartpopupPage } from './jobstartpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobstartpopupPageRoutingModule
  ],
  declarations: [JobstartpopupPage]
})
export class JobstartpopupPageModule {}
