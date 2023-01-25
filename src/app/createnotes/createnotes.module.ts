import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatenotesPageRoutingModule } from './createnotes-routing.module';

import { CreatenotesPage } from './createnotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatenotesPageRoutingModule
  ],
  declarations: [CreatenotesPage]
})
export class CreatenotesPageModule {}
