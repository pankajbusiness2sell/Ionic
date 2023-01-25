import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-alljobs',
  templateUrl: './alljobs.page.html',
  styleUrls: ['./alljobs.page.scss'],
})
export class AlljobsPage implements OnInit {

  full_jobs: string;
  dashboardData: any;

  clearTm: any;
  notificationCount: any;
  work_type: any;

  constructor(
    public loadingCtrl: LoadingController, 
    public dashboardProvider: DashboardProvider, 
    public router: Router,
  ) {
    this.full_jobs = 'new';
   }

  ngOnInit() {
    console.log('ngOnInit AlljobsPage');
    this.dashboardData = {};
    this.notificationCount = '';
    this.work_type = null;

    // if( this.cookieService.get('unreader') ) {
    //   this.clearTm = setInterval(() => {
    //     this.notificationCount = this.cookieService.get('unreader');
    //   }, 2000);
    //  }
    this.getAllJobByRequest();
  }

  refreshPage() {    
    this.dashboardData = {};
    this.notificationCount = '';
    this.work_type = null;
    this.getAllJobByRequest();
  }

  moveToTask() {
    //this.navCtrl.push(CleanertasksPage);
    this.router.navigate(['/cleanertasks']);
  }

   //#### GET COMPLETE JOBS DATA
   async getAllJobByRequest() {

    let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'}); loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    console.log(data);
    this.work_type = data.work_type;
    const dashboardPost: any = {};
    console.log(this.work_type);
    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.getAllJobByRequest( dashboardPost , 'allJobsData' )
    .then((result) => {
      console.log(this.dashboardProvider.returnResponseByNativeHttp(result))
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
      console.log(this.dashboardData);
      loading.dismiss();
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
      loading.dismiss();
    });

  }

  //#### LAND TO DETAIL PAGE
  showActiveJobDetail(ref_) {

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.job_status = "active";

    //#### THIS IS STAFF ID
    dashboardPost.job_id = ref_.jobID;

    console.log(ref_);
    console.log(dashboardPost);

    //#### SEND THE REQUEST FOR GETTING JOB DETAILS
    //#### ON BASIS FEW PARAMETERS MELOW
    //#### STAFF_ID | STAFF_TYPE |JOB_ID | JOB_STATUS
    this.dashboardProvider.getJobDetail(dashboardPost, 'getActiveJobs')
    .then( (result) => {

      console.log(result);
        //localStorage.setItem( 'activeJobDetail' , JSON.stringify(result) );
        // this.navCtrl.push(DetailPage, {
        //   'activeJobDetail': JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result))
        // });
        
        let dt1: NavigationExtras = {
          queryParams: {
            activeJobDetail: JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result))
          }
        };
        this.router.navigate(['/jobdetail'], dt1);

    }, (err) => {
      console.log(err);
    });

  }

  //#### LAND TO DETAIL PAGE
  showActiveJobDetailForReclean(ref_) {

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.job_status = "reclean";

    //#### THIS IS STAFF ID
    dashboardPost.job_id = ref_.jobID;

    console.log(dashboardPost);

    //#### SEND THE REQUEST FOR GETTING JOB DETAILS
    //#### ON BASIS FEW PARAMETERS MELOW
    //#### STAFF_ID | STAFF_TYPE |JOB_ID | JOB_STATUS
    this.dashboardProvider.getJobDetail(dashboardPost, 'reCleanData')
    .then( (result) => {

      console.log(result);

        //localStorage.setItem( 'activeJobDetail' , JSON.stringify(result) );
        // this.navCtrl.push(DetailPage, {
        //   'activeJobDetail': JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result))
        // });

        let dt2: NavigationExtras = {
          queryParams: {
            activeJobDetail: JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result))
          }
        };
        this.router.navigate(['/jobdetail'], dt2);

    }, (err) => {
      console.log(err);
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

}
