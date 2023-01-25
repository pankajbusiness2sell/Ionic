import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.page.html',
  styleUrls: ['./availability.page.scss'],
})
export class AvailabilityPage implements OnInit {

  dashboardData: any = {};
  heading: string;
  dates: any = {};
  rows: any = {};
  prev: string;
  next: string;
  workingdays: any = {};

  clearTm: any;
  notificationCount: any;

  constructor(
    //public cookieService: CookieService, 
    public alertCtrl: AlertController,  
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController, 
    public dashboardProvider: DashboardProvider, 
    public router: Router
  ) { }

  ngOnInit() {
    this.notificationCount = '';

    // if( this.cookieService.get('unreader') ) {
    //   this.clearTm = setInterval(() => {
    //     this.notificationCount = this.cookieService.get('unreader');
    //   }, 2000);
    //  }
     this.getRoaster();
  }

  moveToTask() {
    //this.navCtrl.push(CleanertasksPage);
    this.router.navigate(['/cleanertasks']);
  }

  refreshPage() {    
    this.notificationCount = '';
    this.getRoaster();
  }

  check = () => {
    alert('Checking')
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
  async updateDateStatus(ddate) {

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
    dashboardPost.date = ddate.full_date;

    //#### THIS IS STAFF ID
    dashboardPost.statusid = ddate.avail;

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.updateDateAvail( dashboardPost , 'updateDateAvail' )
    .then(async (result) => {
      console.log(result);
      loading.dismiss();

      let getCrMonth = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
      let currMonth = getCrMonth.result[0].current_dates;
       
      (await this.toastCtrl.create({
        message: getCrMonth.result[0].msg,
        duration: 3000,
        position: 'top'
      })).present();

      this.getRoaster(currMonth);
    }, (err) => {
      console.log(err);
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

  ionViewWillLeave() {
    clearInterval(this.clearTm)
  }

}
