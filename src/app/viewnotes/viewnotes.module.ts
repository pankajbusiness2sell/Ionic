import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewnotesPageRoutingModule } from './viewnotes-routing.module';

import { ViewnotesPage } from './viewnotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewnotesPageRoutingModule
  ],
  declarations: [ViewnotesPage]
})
export class ViewnotesPageModule {}
