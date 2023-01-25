import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DashboardProvider } from '../services/dashboard/dashboard';

@Component({
  selector: 'app-cleanertasks',
  templateUrl: './cleanertasks.page.html',
  styleUrls: ['./cleanertasks.page.scss'],
})
export class CleanertasksPage implements OnInit {

  dashboardData: any = {};
  dashboardData2: any = {};
  heading: string;
  dates: any = {};
  rows: any = {};
  prev: string;
  next: string;
  workingdays: any = {};
  jobslist:any;

  clearTm: any;
  notificationCount: any;

  constructor(
    private router:Router,
    public cookieService: CookieService, 
    public alertCtrl: AlertController,  
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController, 
    public dashboardProvider: DashboardProvider, 
  ) { }

  ngOnInit() {
    this.notificationCount = '';

    if( this.cookieService.get('unreader') ) {
      this.clearTm = setInterval(() => {
        this.notificationCount = this.cookieService.get('unreader');
      }, 2000);
     }
     this.getRoaster();
  }

  //#### GET ROASTER DATES
  async getRoaster(month?: string) {

    console.log(month);

    let loading = await this.loadingCtrl.create({message: 'Please Wait', spinner: 'circles'});
    loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF MONTH STRING
    dashboardPost.month = month ;

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.calender( dashboardPost , 'calender' )
    .then((result) => {
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
      //console.log(this.dashboardData.result[0].calender[0].heading);
      this.heading = this.dashboardData.result[0].calender[0].heading;
      this.rows = this.dashboardData.result[0].calender[0].rows;
      this.rows = Array.from(this.rows).fill(0).map((x,i)=>i);
      console.log(this.rows);
      this.dates = this.dashboardData.result[0].calender[0];
      console.log(this.dates);

      this.prev = this.dashboardData.result[0].calender[0].previous_dates;
      this.next = this.dashboardData.result[0].calender[0].next_dates;

      this.workingdays = this.dashboardData.result[0].calender[0];
      console.log(this.workingdays);
      loading.dismiss();
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
      loading.dismiss();
    });

  }

  //#### GET PREV MONTD CALENDER
  async prevMonth(prev) {

    let loading = await this.loadingCtrl.create({message: 'Please Wait', spinner: 'circles'});
    loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.month = prev;

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.calender( dashboardPost , 'calender' )
    .then((result) => {
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
      //console.log(this.dashboardData.result[0].calender[0].heading);
      this.heading = this.dashboardData.result[0].calender[0].heading;
      this.rows = this.dashboardData.result[0].calender[0].rows;
      this.rows = Array.from(this.rows).fill(0).map((x,i)=>i);
      console.log(this.rows);
      this.dates = this.dashboardData.result[0].calender[0];
      console.log(this.dates);

      this.prev = this.dashboardData.result[0].calender[0].previous_dates;
      this.next = this.dashboardData.result[0].calender[0].next_dates;
      loading.dismiss();
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
      loading.dismiss();
    });

  }

  //#### GET NEXT MONTD CALENDER
  async nextMonth(next) {

    let loading = await this.loadingCtrl.create({message: 'Please Wait', spinner: 'circles'});
    loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.month = next;

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.calender( dashboardPost , 'calender' )
    .then((result) => {
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
      //console.log(this.dashboardData.result[0].calender[0].heading);
      this.heading = this.dashboardData.result[0].calender[0].heading;
      this.rows = this.dashboardData.result[0].calender[0].rows;
      this.rows = Array.from(this.rows).fill(0).map((x,i)=>i);
      console.log(this.rows);
      this.dates = this.dashboardData.result[0].calender[0];
      console.log(this.dates);

      this.prev = this.dashboardData.result[0].calender[0].previous_dates;
      this.next = this.dashboardData.result[0].calender[0].next_dates;
      loading.dismiss();
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
      loading.dismiss();
    });

  }

  checkParams(ddate) {
    console.log(ddate);
  }
  //#### UPDATE DATE STATUS BY DATE FROM ROASTER THRUGH APP
  async checkJobsOnDate(ddate) {

    let loading = await this.loadingCtrl.create({message: 'Please Wait', spinner: 'circles'});
    loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;
    dashboardPost.date = ddate.full_date;

    console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.updateDateAvail( dashboardPost , 'getActiveJobs' )
    .then((result) => {
      
      // loading.dismiss();

      // let rs = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
      // console.log(rs);
      // console.log(rs.result[0].data);
      // this.jobslist = rs.result[0].data.all_jobs;
       
      // this.toastCtrl.create({ 
      //   message: rs.result[0].msg,
      //   duration: 3000,  
      //   position: 'top'    
      // }).present();

      this.dashboardData2 = this.dashboardProvider.returnResponseByNativeHttp(result); //JSON.parse(JSON.stringify(result));
      console.log(this.dashboardData2);
      loading.dismiss();

      //this.getRoaster(currMonth);
    }, (err) => {
      console.log(err);
      loading.dismiss();
    });

  }

  callToAdmin() {
    this.dashboardProvider.callToAdmin();
  }

  gotoChat() {

    // this.navCtrl.push(ChatPage, {
    //   'userDashboardData': JSON.stringify(JSON.parse(localStorage.getItem('afterLoginData'))),
    //   'job_id': 0
    // });
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userDashboardData: JSON.stringify(JSON.parse(localStorage.getItem('afterLoginData'))),
        job_id: 0
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }

  ionViewWillLeave() {
    clearInterval(this.clearTm)
  }

  //#### LAND TO DETAIL PAGE
  async showActiveJobDetail(ref_: any, action: number) {

    console.log(ref_);

    let loading = await this.loadingCtrl.create({
      message: "Please Wait",
      spinner: "circles"
    });
    loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.job_status = "active";

    //#### THIS IS STAFF ID
    dashboardPost.job_id = ref_.jobID;

    dashboardPost.result_for = "cleanertask";

    console.log(dashboardPost);

    //#### SEND THE REQUEST FOR GETTING JOB DETAILS
    //#### ON BASIS FEW PARAMETERS MELOW 
    //#### STAFF_ID | STAFF_TYPE |JOB_ID | JOB_STATUS
    this.dashboardProvider
      .getActiveJobDetail(dashboardPost, "getActiveJobs")    
      .then(   
        result => {
          // loading.dismiss();
          // console.log( JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)) );
          // this.navCtrl.push(DetailPage, {
          //   activeJobDetail: JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)),
          //   page: "active",
          //   action: action !== undefined ? action : 0
          // });

          let dt1: NavigationExtras = {
            queryParams: {
              activeJobDetail: JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)),
              page: "active",
              action: action
            }
          };
          loading.dismiss();
          //resolve();
          this.router.navigate(['/jobdetail'], dt1);

        },
        err => {  
          loading.dismiss();        
          console.log(err);    
        }
      );
  }

}
