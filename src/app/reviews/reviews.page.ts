import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NumtoarrayPipe } from '../pipes/numtoarray/numtoarray';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  reviewData: any;
  rate = 0;

  constructor(
    private route: ActivatedRoute, 
    public NumtoarrayPipe: NumtoarrayPipe
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.reviewData) {
        this.reviewData = JSON.parse(params.reviewData);
      }
    });
  }

  ngOnInit(): void {
    //this.reviewData = JSON.parse(this.navParams.get('reviewData'));
    console.log(this.reviewData);
    
  }

}
