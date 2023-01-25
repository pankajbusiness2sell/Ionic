import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReviewsPageRoutingModule } from './reviews-routing.module';
import { ReviewsPage } from './reviews.page';
import { NumtoarrayPipe } from '../pipes/numtoarray/numtoarray';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsPageRoutingModule
  ],
  declarations: [ReviewsPage, NumtoarrayPipe],
  providers: [NumtoarrayPipe],
})
export class ReviewsPageModule {}
