import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TermandconditionPageRoutingModule } from './termandcondition-routing.module';
import { TermandconditionPage } from './termandcondition.page';
import { SafePipe } from '../pipes/safe/safe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermandconditionPageRoutingModule,
  ],
  declarations: [TermandconditionPage, SafePipe],
  providers: [SafePipe],
})
export class TermandconditionPageModule {}
