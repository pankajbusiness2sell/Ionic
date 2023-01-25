import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Platform, ActionSheetController, PopoverController, ToastController, ModalController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { RecleancheckpopupPage } from '../popup/recleancheckpopup/recleancheckpopup.page';
import { NavigationExtras, Router } from '@angular/router';
//import { NavParams } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reclean',
  templateUrl: './reclean.page.html',
  styleUrls: ['./reclean.page.scss'],
})
export class RecleanPage implements OnInit {

  dashboardData: any;
  jobStartStat: boolean;
  jobEndStat: boolean;
  jobFin: boolean;

  startTime: string;
  finishTime: string;

  imagePath: 'before';

  before: string = 'before';
  after: string = 'after';
  staff_type_global: number;

  clearTm: any;
  notificationCount: any;

  constructor(
    private router:Router,
    //public navParams: NavParams,
    public loadingCtrl?: LoadingController,
    public dashboardProvider?: DashboardProvider,
    public alertCtrl?: AlertController,
    public platform?: Platform,
    public actionSheet?: ActionSheetController,
    public popoverCtrl?: PopoverController,
    private modalController?: ModalController,
    public toastCtrl?: ToastController,
    private cookieService?: CookieService
  ) { }

  ngOnInit() {
    this.dashboardData = {};  
    this.notificationCount = '';      

    console.log('ngOnInit RecleanPage');   
  
    if( this.cookieService.get('unreader') ) {   
      this.clearTm = setInterval(() => {
        this.notificationCount = this.cookieService.get('unreader');
      }, 2000);
     }

    this.getRecleanJobByRequest();    
  }

  refreshPage() {    
    this.dashboardData = {};  
    this.notificationCount = '';
    this.getRecleanJobByRequest(); 
  }

  //#### GET ReClean JOBS DATA
  async getRecleanJobByRequest() {

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
    this.dashboardProvider.getRecleanJobByRequest( dashboardPost , 'reCleanData' )
    .then((result) => {
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);; //JSON.parse(JSON.stringify(result));
      console.log(this.dashboardData);
      loading.dismiss();
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
      loading.dismiss();
    });

  }

  //#### SEND READ NOTES REQUEST TO SERVER
  sendReadnotesRequest(ref_) {
    this.showActiveJobDetail(ref_, 1);
  }

 //#### SEND READ NOTES REQUEST TO SERVER
 recleanDateTIme(ref_) {  
  this.showReCleanDateTIme(ref_);
}

  async showReCleanDateTIme(ref_){
  let popover = await this.popoverCtrl.create({
    component: RecleancheckpopupPage,
    componentProps: { reCleanData: ref_ }
  });
  popover.style.cssText = '--min-width: 320px; --min-height: 220px;';
  popover.present(); 
  popover.onDidDismiss().then((data) => {
    if( data != null ) this.getRecleanJobByRequest();
  })    
}

  //#### LAND TO DETAIL PAGE
  showActiveJobDetail(ref_, action?: number) {

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
        // JSON.stringify(result)
        // this.navCtrl.push(DetailPage, {
        //   'activeJobDetail': JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)),
        //   'page': 'reclean',
        //   'action': (action !== undefined) ? action : 0
        // });

        let dt1: NavigationExtras = {
          queryParams: {
            activeJobDetail: JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)),
            page: 'reclean',
            action: (action !== undefined) ? action : 0
          }
        };
        this.router.navigate(['/jobdetail'], dt1);

    }, (err) => {
      console.log(err);
    });

  }

  //#### ADD ACTIONE TO CHOOSE WICH WNST TO PERFORM OR CLOSE IT
  async pictureEvent(jobData) {

    //#### OPEN MENU FOR IMAGE PAGE
    await (await this.actionSheet.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Before',
          handler: () => {
            console.log('Before was pressed');
            // this.navCtrl.push(ImagebeforePage, {
            //   jobDataForBeforePage: jobData
            // });
            let dt2: NavigationExtras = {
              queryParams: {
                jobDataForBeforePage: JSON.stringify(jobData)
              }
            };
            this.router.navigate(['/imagebefore'], dt2);
          }
        },
        {
          text: 'After',
          handler: () => {
            console.log('After was pressed');
            // this.navCtrl.push(ImageafterPage, {
            //   jobDataForAfterPage: jobData
            // });
            let dt3: NavigationExtras = {
              queryParams: {
                jobDataForAfterPage: JSON.stringify(jobData)
              }
            };
            this.router.navigate(['/imageafter'], dt3);
          }
        },
        {
          text: 'CheckList',
          handler: () => {
            console.log('CheckList Upload was pressed');
            // this.navCtrl.push(ChecklistPage, {
            //   jobDataForBeforePage: jobData,
            //   action: 3
            // });
            let dt4: NavigationExtras = {
              queryParams: {
                jobDataForBeforePage: JSON.stringify(jobData),
                action: 3
              }
            };
            this.router.navigate(['/checklist'], dt4);
          }
        }, {
          text: 'No Guarantee Images',
          handler: () => {
            // // // console.log('CheckList Upload was pressed');
            // this.navCtrl.push(ChecklistPage, {
            //   jobDataForBeforePage: jobData,
            //   action: 4
            // });
            let dt5: NavigationExtras = {
              queryParams: {
                jobDataForBeforePage: JSON.stringify(jobData),
                action: 4
              }
            };
            this.router.navigate(['/gaurantee'], dt5);
          }
        },
        {
          text: 'Upsell Images',
          handler: () => {
            // // // console.log('CheckList Upload was pressed');
            // this.navCtrl.push(ChecklistPage, {
            //   jobDataForBeforePage: jobData,
            //   action: 5
            // });

            let dt6: NavigationExtras = {
              queryParams: {
                jobDataForBeforePage: JSON.stringify(jobData),
                action: 5
              }
            };
            this.router.navigate(['/upsell'], dt6);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })).present();

    //this.navCtrl.push(ImagebeforePage);
  }

  //#### ACCEPTED || DENIED BEFORE JOB START AND SEND THE DETAIL TO ADMIN IMMEDIATELY
  //#### BUT JOB WILL START WOTHOUT ANY MESSAGE.
  //#### CHOOSE OPTION BEFORE JOB  
  acceptDetailBeforeJobStart(jobData) {

    //#### ACCEPTED || DENIED BEFORE JOB START AND SEND THE DETAIL TO ADMIN IMMEDIATELY
    //#### BUT JOB WILL START WOTHOUT ANY MESSAGE.   
    //#### CHOOSE OPTION BEFORE JOB
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = jobData.jobID;

    //#### THIS IS STAFF ID FOR RECLEAN START
    dashboardPost.startStaus = 3;

    //#### THIS IS STAFF ID
    dashboardPost.staff_name = data.name;

    console.log(dashboardPost);

    this.dashboardProvider.jobStartStatus(dashboardPost, 'reCleanButton')
      .then((result) => {

        this.getRecleanJobByRequest();

      }, (err) => {
      console.log(err)
    });
  }

  //#### START JOB AND COMPLETE
  jobStartStatus( jobOpt, jobID, jobData ) {

    //#### INVOKE TO CHANGE STATUS OF UPSELL
    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.startStaus = 4;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = jobID;

    //#### THIS IS STAFF JOB ID
    if( jobData.reclean_id ) {
      dashboardPost.reclean_id = jobData.reclean_id;
    }

    console.log(dashboardPost);

    //#### INVOKE SERVICE FOR PLAY OR COMPLETE JOB
    this.dashboardProvider.jobStartStatus( dashboardPost, 'reCleanButton' )
    .then( async (result) => {
      console.log(result);

      //#### CHECK STATUS FOR START OR COMPLETE
      const jobStartStausInResult = this.dashboardProvider.returnResponseByNativeHttp(result)['status'] // Array.of(result)[0]['status'];
      if( jobStartStausInResult === 200 && dashboardPost.startStaus == 4 ) {

        // #### TO CHECK
        if( this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["afterImageCounter"] === 0 ) {
          (await this.alertCtrl.create({
            header: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["msg"],
            buttons: ['Ok']
          }))
            .present();

        } else {
          this.jobStartStat = false;
          this.jobEndStat = false;
          this.jobFin = true;
          this.finishTime = this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["datetime"];
          console.log(this.finishTime);
          (await this.toastCtrl
            .create({
              message: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["msg"],
              duration: 2000,
              position: "top"
            }))
            .present();
        }
      }

      //#### GET IT AGAIN ALL
      this.getRecleanJobByRequest();

    }, (err) => {
      console.log(err);
    })

  }

  //#### PICK SUB STAFF FOR THE JOB AND REFERESH IT AGAIN
  async selectSubStaff(subStaffSelector, jobsData) {

    console.log("Sub Staff Select");
    console.log(subStaffSelector);

    let loading = await this.loadingCtrl.create({message: 'Assigning... ', spinner: 'circles'});
    loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS JOB ID
    dashboardPost.job_id = jobsData.jobID;

    //#### THIS IS SUB STAFF ID
    dashboardPost.sub_staff_id = subStaffSelector.detail.value;

    //#### THIS IS JOB TYPE
    dashboardPost.type = jobsData.type;

    console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.assignJobToSubStaff( dashboardPost , 'assignJobToSubStaff' )
    .then(async (result) => {
      let resultParse = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
      console.log(resultParse);
      loading.dismiss();
      (await this.toastCtrl.create({
        message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
        duration: 2000,
        position: 'top'
      })).present();
    }, async (err) => {
      console.log(err);
      loading.dismiss();
      (await this.toastCtrl.create({
          message: 'Something wrong in assign.',
          duration: 2000,
          position: 'top'
        })).present();
    });

  }

  callToAdmin() {
    this.dashboardProvider.callToAdmin();
  }

  //#### GO TO CHAT PAGE
  gotoChat(jobId?: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userDashboardData: JSON.stringify(JSON.parse(localStorage.getItem('afterLoginData'))),
        job_id: jobId
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }

  moveToTask() {
    //this.navCtrl.push(CleanertasksPage);
    this.router.navigate(['/cleanertasks']);
  }

  callToCustomer(customerNumber, newJobs) {

    console.log(customerNumber);

    window.open('tel:'+customerNumber, '_self');

    //this.dashboardProvider.callToCustomer(customerNumber);

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS JOB ID
    dashboardPost.job_id = newJobs.jobID;

    //#### THIS IS JOB TYPE
    dashboardPost.type = 'reclean';

    console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.callToCustomer( dashboardPost , 'call_counter' )
    .then((result) => {
      let resultParse = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
      console.log(resultParse);
    }, (err) => {
      console.log(err);
    });

  }

}
