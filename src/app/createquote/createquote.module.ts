import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatequotePageRoutingModule } from './createquote-routing.module';

import { CreatequotePage } from './createquote.page';
//import { SmsProvider } from '../services/sms/sms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatequotePageRoutingModule
  ],
  declarations: [CreatequotePage]
})
export class CreatequotePageModule {}
