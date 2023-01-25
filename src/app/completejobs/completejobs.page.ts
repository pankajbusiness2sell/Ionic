import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-completejobs',
  templateUrl: './completejobs.page.html',
  styleUrls: ['./completejobs.page.scss'],
})
export class CompletejobsPage implements OnInit {

  dashboardData: any;
  allJobsData:any;
  completeJobCount: number = 0;
  responseData = [];
  noRecords = false;
  pet: any;

  clearTm: any;
  notificationCount: any;

  constructor(
    //private cookieService: CookieService,
    public loadingCtrl: LoadingController,
    public dashboardProvider: DashboardProvider,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('ngOnInit CompletejobsPage');
    this.dashboardData = {};
    this.completeJobCount = 0;
    this.notificationCount = '';

    // if( this.cookieService.get('unreader') ) {
    //   this.clearTm = setInterval(() => {
    //   this.notificationCount = this.cookieService.get('unreader');
    //   }, 2000);
    // }

    this.getCompleteJobByRequest();
  }

  refreshPage() {    
    this.dashboardData = {};
    this.completeJobCount = 0;
    this.notificationCount = '';
    this.getCompleteJobByRequest();
  }

  moveToTask() {
    //this.navCtrl.push(CleanertasksPage);
    this.router.navigate(['/cleanertasks']);
  }

  //#### CLEAR AND CANCELLED PRESSED
  cancelled() {
    console.log('cancelled');
    this.getCompleteJobByRequest();
  }
    
  test() {
    console.log('clear');
    this.getCompleteJobByRequest();
  }

  //#### GET COMPLETE JOBS DATA
  async getCompleteJobByRequest(searchStr?: any) {

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
  
  if( searchStr !== undefined && searchStr !== '' && searchStr.length >= 3) {
  //#### THIS IS STAFF ID
  dashboardPost.staff_job_id = searchStr;
  }
  
  //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
  this.dashboardProvider.getCompleteJobByRequest( dashboardPost , 'completedJobsData' )
  .then((result) => {
    this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
    
    //this.dashboardData = JSON.parse(this.navParams.get('activeJobs'));
    console.log(this.dashboardData);
    this.completeJobCount = 0; // this.dashboardData.result[0].data.all_completed_jobs.length;
    loading.dismiss();
  
  }, (err) => {
    console.log(err);
    this.dashboardData = JSON.parse(JSON.stringify(err));
    loading.dismiss();
  });
  
  }
  
  //#### FOR SCROLLING
  doInfinite(): Promise<any> {
  console.log('Begin async operation');
  //let loading = this.loadingCtrl.create({content: 'Loading more jobs', spinner: 'ios'});loading.present();
  
  //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
  let data = JSON.parse(localStorage.getItem('afterLoginData'));
  const dashboardPost: any = {};
  
  //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
  dashboardPost.staff_type = data.staff_type;
  
  //#### THIS IS STAFF ID
  dashboardPost.staff_id = data.id;
  
  //#### THIS IS STAFF ID
  dashboardPost.offset = this.dashboardData.result[0].data.all_completed_jobs.length; //this.completeJobCount
  
  //#### THIS IS STAFF ID
  dashboardPost.limit = 10;
  
  console.log(dashboardPost);
  
  return new Promise((resolve, reject) => {
  
  //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
  this.dashboardProvider.getScrollData( dashboardPost , 'completedJobsData' )
  .then((result) => {
    const response = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['data']['all_completed_jobs'];
    console.log(response);
    
    if( response !== "undefined" ){
    this.dashboardData['result'][0]['data']['all_completed_jobs'] = this.dashboardData['result'][0]['data']['all_completed_jobs'].concat(response);
    } else {
    this.noRecords = true;
    }
    

    resolve();
  
  }, (err) => {
    //console.log(err);
    this.noRecords = true;
    console.log(this.noRecords);
    reject(err);
    //loading.dismiss();
  });
  
  })
  
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
  dashboardPost.job_status = "complete";
  
  //#### THIS IS STAFF ID
  dashboardPost.job_id = ref_.job_id;
  
  console.log(dashboardPost);
  
  //#### SEND THE REQUEST FOR GETTING JOB DETAILS
  //#### ON BASIS FEW PARAMETERS MELOW
  //#### STAFF_ID | STAFF_TYPE |JOB_ID | JOB_STATUS
  this.dashboardProvider.getJobDetail(dashboardPost, 'getActiveJobs')
  .then( (result) => {
  
    console.log(result);
    //localStorage.setItem( 'activeJobDetail' , JSON.stringify(result) );
    // this.navCtrl.push(DetailPage, {
    // 'activeJobDetail': JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)),
    // 'page': 'complete'
    // });

    let dt1: NavigationExtras = {
      queryParams: {
        activeJobDetail: JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)),
        page: 'complete'
      }
    };
    this.router.navigate(['/jobdetail'], dt1);

  }, (err) => {
    console.log(err);
  });
  
  }
  
  //#### FOR MAKING REQUEST TO SERACH JOB THROUGH JOBID
  getItems(serachStr) {
    if( serachStr.length >= 3) {
      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      this.getCompleteJobByRequest( serachStr );    
    }
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
