import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  full_jobs: string;
  dashboardData: any;

  clearTm: any;
  notificationCount: any;

  constructor(
    public cookieService: CookieService, 
    public loadingCtrl: LoadingController, 
    public dashboardProvider: DashboardProvider,
    private router: Router,
  ) { 
    this.full_jobs = 'pending';
  }

  ngOnInit() {
    //console.log('ionViewWillEnter AccountsPage');
    this.dashboardData = {};

    this.notificationCount = '';
    if( this.cookieService.get('unreader') ) {
      this.clearTm = setInterval(() => {
        this.notificationCount = this.cookieService.get('unreader');
      }, 2000);
    }
    this.getAllJobForAccount();
  }

  refreshPage() {    
    this.dashboardData = {};
    this.notificationCount = '';
    this.getAllJobForAccount();
  }

    //#### GET COMPLETE JOBS DATA
    async getAllJobForAccount() {

      let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
      loading.present();
  
      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};
  
      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
      dashboardPost.staff_type = data.staff_type;
  
      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;
  
      //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
      this.dashboardProvider.getAllJobForAccount( dashboardPost , 'getAccountSection' )
      .then((result) => {
        this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
        console.log(this.dashboardData);
        loading.dismiss();
      }, (err) => {
        console.log(err);
        this.dashboardData = JSON.parse(JSON.stringify(err));
        loading.dismiss();
      });
  
    }
  
    callToAdmin() {
      this.dashboardProvider.callToAdmin();
    }
  
    gotoChat() {

      let navigationExtras: NavigationExtras = {
        queryParams: {
          userDashboardData: JSON.stringify(JSON.parse(localStorage.getItem('afterLoginData'))),
          job_id: 0
        }
      };
      this.router.navigate(['/chat'], navigationExtras);

    }

    moveToTask() {
      //this.navCtrl.push(CleanertasksPage);
      this.router.navigate(['/cleanertasks']);
    }

}
