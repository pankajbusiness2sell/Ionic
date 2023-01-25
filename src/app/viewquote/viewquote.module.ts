import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewquotePageRoutingModule } from './viewquote-routing.module';

import { ViewquotePage } from './viewquote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewquotePageRoutingModule
  ],
  declarations: [ViewquotePage]
})
export class ViewquotePageModule {}
