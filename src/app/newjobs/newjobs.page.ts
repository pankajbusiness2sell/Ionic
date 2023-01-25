import { Component, OnInit } from '@angular/core';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { LoadingController, ActionSheetController, AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-newjobs',
  templateUrl: './newjobs.page.html',
  styleUrls: ['./newjobs.page.scss'],
})
export class NewjobsPage implements OnInit {

  dashboardData: any;
  staff_type_global: number;

  clearTm: any;
  notificationCount: any;

  constructor(
    public dashboardProvider: DashboardProvider,
    //public navCtrl: NavController,
    //public navParams: NavParams,
    public loadingCtrl: LoadingController,
    //private cookieService: CookieService,
    public actionSheet: ActionSheetController,
    private router: Router,
    public alertCtrl?: AlertController,
  ) { }

  ngOnInit() {

    this.dashboardData = {};
    this.notificationCount = '';

    // if( this.cookieService.get('unreader') ) {
    //   this.clearTm = setInterval(() => {
    //     this.notificationCount = this.cookieService.get('unreader');
    //   }, 2000);
    //  }

    this.getNewJobsData();
  }

  refreshPage() {    
    this.dashboardData = {};
    this.notificationCount = '';
    this.getNewJobsData();
    setTimeout(() => {
    console.log('Async operation has ended');
    }, 1000);
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

  callToAdmin() {
    this.dashboardProvider.callToAdmin();
  }

    //#### GET NEW JOBS DATA
    async getNewJobsData() {

      let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
      loading.present();
  
      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};
  
      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
      dashboardPost.staff_type = data.staff_type;
      this.staff_type_global = data.staff_type;
  
      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;
  
      //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
      this.dashboardProvider.getNewJobByRequest( dashboardPost , 'getNewJobs' )
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

    // #### ALLOW TO CHECK OPTIONS DUE TO DENY THE JOB
  checkOptionBeforeDeny(eventName: string, JobId: number) {

    // #### LETS CHECK THE OPTIONS FIRST
    this.invokeOptionList(eventName, JobId);

  }

  //#### ADD ACTIONE TO CHOOSE WICH WNST TO PERFORM OR CLOSE IT
  async invokeOptionList(eventName: string, JobId: number) {

    let alert = await this.alertCtrl.create({
      header: 'Please select the reason below',
      inputs: [
        {
          type: 'checkbox',
          label: 'Not Available',
          value: '1'
        },
        {
          type: 'checkbox',
          label: 'Too Far',
          value: '2'
        },
        {
          type: 'checkbox',
          label: 'Too Big',
          value: '3'
        },
        {
          type: 'checkbox',
          label: 'Others',
          value: '4'
        }
      ],
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            console.log(data);
            console.log(data.length);
            this.jobAcceptDenyStatus(eventName, JobId);
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log(data);
            console.log(data.length);
            this.jobAcceptDenyStatus(eventName, JobId, data);
          }
        }
      ]
    });

    alert.present();
  }

  //#### MAKE NEW REQUEST FOR ACCEPT | DENY
  async jobAcceptDenyStatus(eventName: string, JobId: number, reasons?: any) {

    let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
    loading.present();

    //#### THIS WILL RETURN ALL STATUS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS JOB ID
    dashboardPost.job_id = JobId;

    //#### THIS IS EVENT NAME
    dashboardPost.event_name = eventName;

    if (reasons !== undefined ) {
      //#### THIS IS THE REASON OPTIONS
      dashboardPost.reasons = reasons;
    }

    console.log(reasons);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.jobAcceptDenyStatus( dashboardPost , 'jobAcceptDenyStatus' )
    .then((result) => {
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); //JSON.parse(JSON.stringify(result));
      this.getNewJobsData();
      console.log(result);
      loading.dismiss();
    }, (err) => {
      console.log(err);
      loading.dismiss();
    });

  }

}
