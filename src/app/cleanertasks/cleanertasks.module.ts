import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CleanertasksPageRoutingModule } from './cleanertasks-routing.module';

import { CleanertasksPage } from './cleanertasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CleanertasksPageRoutingModule
  ],
  declarations: [CleanertasksPage]
})
export class CleanertasksPageModule {}
