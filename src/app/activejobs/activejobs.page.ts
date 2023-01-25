import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController, Platform, ActionSheetController, PopoverController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';

import { JobstartpopupPage } from '../popup/jobstartpopup/jobstartpopup.page';
//import { EveningcheckpopupPage } from '../popup/eveningcheckpopup/eveningcheckpopup.page';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EveningcheckPage } from '../eveningcheck/eveningcheck.page';


import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AssignRecleanPopupPage } from '../popup/assign-reclean-popup/assign-reclean-popup.page';
import { AssignComplaintPopupPage } from '../popup/assign-complaint-popup/assign-complaint-popup.page';


@Component({
  selector: 'app-activejobs',
  templateUrl: './activejobs.page.html',
  styleUrls: ['./activejobs.page.scss'],
})
export class ActivejobsPage implements OnInit {

  locationCoords: any;
  timetest: any;

  dashboardData: any;
  invoiceRes:any;
  jobStartStat: boolean;
  jobEndStat: boolean;
  jobFin: boolean;
  startTime: string;
  finishTime: string;
  imagePath: "before";
  before: string = "before";
  after: string = "after";
  staff_type_global: number;
  gpsInfo: any = {};
  apidata: any;
  defaultDataMsg: any;

  // #### FOR TEAM SELECTION
  teamSize = [1, 2, 3, 4, 5];
  teamwork: any;

  // FOR CLEANING
  forCleaning: boolean;
  commonMessage: string;
  clearTm: any;
  notificationCount: any;

  constructor(
    private router:Router,
    public loadingCtrl?: LoadingController,
    public toastCtrl?: ToastController,
    public dashboardProvider?: DashboardProvider,   
    public alertCtrl?: AlertController,
    public platform?: Platform,
    public actionSheet?: ActionSheetController,
    public popoverCtrl?: PopoverController,    
    private cookieService?: CookieService,
    public diagnostic?: Diagnostic,
    private androidPermissions?: AndroidPermissions,
    private geolocation?: Geolocation,
    private locationAccuracy?: LocationAccuracy
  ) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();
  }

  ngOnInit() {
    this.forCleaning = true;
    this.dashboardData = {};

    // if( this.navParams.get('job_id') && this.navParams.get('job_id') != '') {   
    //   // alert('3PM check - ' +   this.navParams.get('job_id'))  
    //   alert( 'Please Call to Client for Confirm job Time  J#' + this.navParams.get('job_id') );
    //   // this.openPopover(allJobs, 3);
    // }

    console.log("ngOnInit ActivejobsPage");
    this.notificationCount = "";

    if (this.cookieService.get("unreader")) {
      this.clearTm = setInterval(() => {
        this.notificationCount = this.cookieService.get("unreader");
      }, 2000);
    }

    this.getActiveJobByRequest();
  }

  refreshPage() {    
    this.forCleaning = true;
    this.dashboardData = {};
    if (this.cookieService.get("unreader")) {
      this.clearTm = setInterval(() => {
        this.notificationCount = this.cookieService.get("unreader");
      }, 2000);
    }

    this.getActiveJobByRequest();
  }

  //#### GET ACTIVE JOBS DATA
  async getActiveJobByRequest() {
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
    this.staff_type_global = data.staff_type;

    console.log(this.staff_type_global);

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id; 

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider
      .getNewJobByRequest(dashboardPost, "getActiveJobs")
      .then(
        result => {
          this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); //JSON.parse(JSON.stringify(result));
          console.log(this.dashboardData);
          loading.dismiss();
        },
        err => {    
          console.log(err); 
          this.dashboardData = JSON.parse(JSON.stringify(err));
          loading.dismiss();
        }
      );
  }

  //#### SEND READ NOTES REQUEST TO SERVER
  sendReadnotesRequest(ref_) {
    this.showActiveJobDetail(ref_, 1);
  }

  //#### LAND TO DETAIL PAGE
  async showActiveJobDetail(ref_: any, action: number) {

    console.log(ref_);

    let loading = await this.loadingCtrl.create({
      message: "Please Wait",
      spinner: "circles"
    });
    await loading.present();

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

    //#### SEND THE REQUEST FOR GETTING JOB DETAILS
    //#### ON BASIS FEW PARAMETERS MELOW
    //#### STAFF_ID | STAFF_TYPE |JOB_ID | JOB_STATUS
    await new Promise<void>((resolve, reject) => {
      this.dashboardProvider
      .getActiveJobDetail(dashboardPost, "getActiveJobs")    
      .then(
        result => {
          let dt1: NavigationExtras = {
            queryParams: {
              activeJobDetail: JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)),
              page: "active",
              action: action
            }
          };
          loading.dismiss();
          resolve();
          this.router.navigate(['/jobdetail'], dt1);
        },
        err => {                  
          console.log(err);
          loading.dismiss();    
          reject(err);
        }
      );  
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
      header: "Please select the reason below",
      inputs: [
        {
          type: "checkbox",
          label: "Not Available",
          value: "1"
        },
        {
          type: "checkbox",
          label: "Too Far",
          value: "2"
        },
        {
          type: "checkbox",
          label: "Too Big",
          value: "3"
        },
        {
          type: "checkbox",
          label: "Others",
          value: "4"
        }
      ],
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
            console.log(data);
            console.log(data.length);
            this.jobReassingStatus(eventName, JobId);
          }
        },
        {
          text: "Yes",
          handler: data => {
            console.log(data);
            console.log(data.length);
            this.jobReassingStatus(eventName, JobId, data);
          }



        }
      ]
    });
    alert.present();
  }

  //#### REASSIGN BY JOB ID WITH EVENT NAME
  async jobReassingStatus(eventName: string, JobId: number, reasons?: any) {
    let loading = await this.loadingCtrl.create({
      message: "Please wait",
      spinner: "circles"
    });
    loading.present();

    //#### THIS WILL RETURN ALL STATUS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS JOB ID
    dashboardPost.job_id = JobId;

    //#### THIS IS EVENT NAME
    dashboardPost.event_name = eventName;

    if (reasons !== undefined) {
      //#### THIS IS THE REASON OPTIONS
      dashboardPost.reasons = reasons;
    }

    console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider
      .jobAcceptDenyStatus(dashboardPost, "jobAcceptDenyStatus")
      .then(
        result => {
          this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
          this.getActiveJobByRequest();
          console.log(result);
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  //#### ADD ACTIONE TO CHOOSE WICH WNST TO PERFORM OR CLOSE IT
  async pictureEvent(jobData) {
    //#### OPEN MENU FOR IMAGE PAGE
    await (await this.actionSheet
      .create({
        cssClass: "action-sheets-basic-page",
        buttons: [
          {
            text: "Before",
            handler: () => {
              console.log("Before was pressed");
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
            text: "After",
            handler: () => {
              console.log("After was pressed");
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
              // // // console.log('CheckList Upload was pressed');
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
              // this.navCtrl.push(GuaranteePage, {
              //   jobDataForBeforePage: jobData,
              //   action: 3
              // });
              let dt5: NavigationExtras = {
                queryParams: {
                  jobDataForBeforePage: JSON.stringify(jobData),
                  action: 3
                }
              };
              this.router.navigate(['/gaurantee'], dt5);
            }
          }, {
            text: 'Upsell Images',
            handler: () => {
              // this.navCtrl.push(UpsellPage, {
              //   jobDataForBeforePage: jobData,
              //   action: 3
              // });
              let dt6: NavigationExtras = {
                queryParams: {
                  jobDataForBeforePage: JSON.stringify(jobData),
                  action: 3
                }
              };
              this.router.navigate(['/upsell'], dt6);
            }
          },
          {
            text: "Cancel",
            role: "cancel"
          }
        ]
      }))
      .present();

    //this.navCtrl.push(ImagebeforePage);
  }

  async sendInvoice(jobData) {
    let loading = await this.loadingCtrl.create({
      message: "Please wait",
      spinner: "circles"
    });
    loading.present();

    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};
    dashboardPost.staff_type = data.staff_type;
    dashboardPost.staff_id = data.id;
    dashboardPost.quote_id = jobData.quote_id;
    dashboardPost.jobinv = jobData.jobinv;
    console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider
      .invoiceEmail(dashboardPost, "invoiceEmail")
      .then(
        async result => {
          this.invoiceRes = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
          //this.getActiveJobByRequest();
          console.log(result);
          loading.dismiss();
          (await this.toastCtrl.create({
            message: this.invoiceRes['result'][0]['msg'],
            duration: 2000,
            position: 'bottom'
          })).present();
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }

  //#### CHECK PAID AND UNPAID
  async checkPaidStatusBeforeJobStart(jobData) {
    if (jobData.jobpaidstatus === "0") {
      await (await this.alertCtrl
        .create({
          header: jobData.paidMessage,
          buttons: [
            {
              text: "Notify Bcic",
              handler: () => {
                this.receivePaidStatus(jobData);
              }
            }
          ]
        }))
        .present();
    }
  }

  //#### AFTER PRESS OK, WILL START THE JOB
  async receivePaidStatus(jobData) {
    let loading = await this.loadingCtrl.create({
      message: "Please wait... ",
      spinner: "circles"
    });
    loading.present();

    //#### INVOKE TO CHANGE STATUS OF UPSELL
    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = jobData.jobID;

    console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider
      .receivePaidStatus(dashboardPost, "receivePaidStatus")
      .then(
        result => {
          let resultParse = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
          console.log(resultParse);
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
  }
  
  //#### OPEN POPOVER
  openPopover(jobData, type: number) {

    // #### REMOVALS
    if(type === 1) {
      this._startRemovalJob(jobData);
    }

    // #### CLEANING
    if(type === 2) {
      this.openPopoverInner(jobData);
    }

    if(type === 3) {
      this.openPopupContactCLient(jobData);   
    }       

  }

  // #### FOR REMOVALS
  _startRemovalJob = (jobData) => {

    //#### CHECK IF UNPAID, POPOVER WILL NOT OPRN AND ITS FLASHIGN THE ALERT.
    if (jobData.jobpaidstatus === "0") {
      this.checkPaidStatusBeforeJobStart(jobData);
      return false;
    }

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
    dashboardPost.startStaus = 1;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = jobData.jobID;

    console.log(dashboardPost);

    //#### INVOKE SERVICE FOR PLAY OR COMPLETE JOB
    this.dashboardProvider.jobStartStatus( dashboardPost, 'jobStartStatus' )
    .then( async (result) => {
      console.log(result);

      //#### CHECK STATUS FOR START OR COMPLETE
      const jobStartStausInResult = this.dashboardProvider.returnResponseByNativeHttp(result)['status'];
      if( jobStartStausInResult === 200 && dashboardPost.startStaus == 1 ) {
        this.jobStartStat = false;
        this.jobEndStat = true;
        this.jobFin = false;
        this.startTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];
        console.log(this.startTime);
        (await this.toastCtrl.create({
          message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
          duration: 2000,
          position: 'top'
        })).present();
      } else if( jobStartStausInResult === 200 && dashboardPost.startStaus == 2 ) {
        this.jobStartStat = false;
        this.jobEndStat = false;
        this.jobFin = true;
        this.finishTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];
        console.log(this.finishTime);
        (await this.toastCtrl.create({
          message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
          duration: 2000,
          position: 'top'
        })).present();
      }

      this.getActiveJobByRequest();

    }, (err) => {
      console.log(err);
    })

  }

  //#### OPEN POPOVER
  async openPopoverInner(jobData) {
    //#### CHECK IF UNPAID, POPOVER WILL NOT OPRN AND ITS FLASHIGN THE ALERT.
    if (jobData.jobpaidstatus === "0") {
      this.checkPaidStatusBeforeJobStart(jobData);
      return false;
    }

    // New Code i5
    let popover = await this.popoverCtrl.create({
      component: JobstartpopupPage,
      componentProps: { jobDetail: jobData },
      translucent: true,
      cssClass: 'startpopup'
    });
    popover.style.cssText = '--min-width: 280px; --max-width: 300px;';
    popover.present();

    //#### WHEN DISMISS THE POPOVER AFTER GETTING RESULT
    //#### GET FROM POPVER ALL THE VALUE ( OBJECT | ARRAY | SINGLR ITEM | NULL )
    popover.onDidDismiss().then(
       async (dataReturned) => {
        if (dataReturned.data === null || dataReturned.data === undefined) {
        } else {
          let result = JSON.parse(dataReturned.data);
  
          console.log('--------------------');
          console.log(result);
          console.log('--------------------');
          
          let jobStartStausInResult = result.status;
  
          //this.startTime = dataBack.result[0].datetime;
  
          if (jobStartStausInResult === 200) {
            //#### GET IT AGAIN ALL
            this.getActiveJobByRequest();
  
            (await this.toastCtrl
              .create({
                message: result["result"][0]["msg"],
                duration: 2000,
                position: "top"
              }))
              .present();
          }
        }
      }
    );

    

  }
 
  

  async openPopupContactCLient(jobData) {  
    //#### CHECK IF UNPAID, POPOVER WILL NOT OPRN AND ITS FLASHIGN THE ALERT.
    
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
    dashboardPost.startStaus = 1;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = jobData.jobID;  

    console.log(dashboardPost);  
    //this.checkTimePopup(jobData);   
    console.log(jobData);
    
    let popover = await this.popoverCtrl.create({
      component: EveningcheckPage,   
      componentProps: { jobData: jobData }
    });
    popover.style.cssText = '--min-width: 320px; --min-height: 220px;';
    popover.present();
}

  
  // #### GET GPS AND LOCATION INFORMATION
  // #### EITHER IS ENABLED OR NOT
  getGps2 = async (jobOpt, jobID) => {  
    
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'circles'
    });
    loading.present();

    await this.platform.ready()
    .then(async () => { 
      await this.diagnostic.isLocationEnabled()
      .then( async (state) => {  
        console.log(state);
        if( state == false ) { 
          loading.dismiss();
          await (await this.alertCtrl.create({
            header: 'Location Error',
            subHeader: "Job can't start and stop without knowing your location.",
            buttons: [
              {
                text: 'Ok',
                handler: () => console.log('Pressed Ok')
              }
            ]
          }))
          .present();
        } else {
          let options = {timeout: 10000, enableHighAccuracy: false};
          await this.geolocation.getCurrentPosition(options).then((resp) => {
            this.gpsInfo.latitude = resp.coords.latitude;
            this.gpsInfo.longitude = resp.coords.longitude; 
            // alert(this.gpsInfo.latitude + "----" + this.gpsInfo.longitude)

            loading.dismiss();
            this._jobStartStatus(jobOpt, jobID);
           }).catch(async (error) => {
             console.log('Error getting location', error); 
             loading.dismiss();
             await (await this.alertCtrl.create({
               header: 'Location access is required',
               subHeader: "Please go to your device settings and switch OFF and ON location once again",
               buttons: [
                 {
                   text: 'Ok',
                   handler: () => console.log('Pressed Ok')
                 }
               ]
             }))
            .present();
           });  
        }
      }).catch(async e => {
        loading.dismiss();
        await (await this.alertCtrl.create({
          header: 'Location Error',
          subHeader: "Job can't start and stop without knowing your location.",
          buttons: [
            {
              text: 'Ok',
              handler: () => console.log('Pressed Ok')
            }
          ]
        }))
        .present();
      });
    })    
  }

  //#### START JOB AND COMPLETE
  jobStartStatus = async (jobOpt, jobID) => {
    let platforms = this.platform.platforms();
      console.log(platforms);         
      if( this.platform.is("desktop") ) {
        await this._jobStartStatus(jobOpt, jobID);
      } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
        try {
          // await this.getGps(jobOpt, jobID)
          await this.checkGPSPermission(jobOpt, jobID);
        }
        catch(err) {  
          alert('Error in location, Please check your location permission into your device settings.')
          return false;
        }
      }    
  }

  _jobStartStatus = async (jobOpt, jobID) => {

    let loading = await this.loadingCtrl.create({
      message: "Please wait",
      spinner: "circles"
    });
    loading.present();

    //#### INVOKE TO CHANGE STATUS OF UPSELL
    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.startStaus = jobOpt;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = jobID;

    //#### THIS IS STAFF LATITUDE
    dashboardPost.latitude = this.gpsInfo.latitude;

    //#### THIS IS STAFF LONGITUDE
    dashboardPost.longitude = this.gpsInfo.longitude;

    console.log(dashboardPost);

    //#### INVOKE SERVICE FOR PLAY OR COMPLETE JOB
    this.dashboardProvider
      .jobStartStatus(dashboardPost, "jobStartStatus")
      .then(
        async result => {

          console.log(result);

          //#### CHECK STATUS FOR START OR COMPLETE
          const jobStartStausInResult = this.dashboardProvider.returnResponseByNativeHttp(result)["status"];

          // #### THIS IS SMAL LCHECK FOR CLEANING AND REMOVAL STOPPING JOB INSTANTLY
          if(this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["instant_stop"] &&
          this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["instant_stop"] === true) {

            loading.dismiss();
            (await this.alertCtrl.create({
              header: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["msg"],
              buttons: ['Ok']
            }))
              .present();
              return;
          }

          if (
            jobStartStausInResult === 200 &&
            dashboardPost.startStaus == 1
          ) {
            this.jobStartStat = false;
            this.jobEndStat = true;
            this.jobFin = false;
            this.startTime = this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["datetime"];
            console.log(this.startTime);
            loading.dismiss();
            (await this.toastCtrl
              .create({
                message: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["msg"],
                duration: 2000,
                position: "top"
              }))
              .present();
          } else if (
            jobStartStausInResult === 200 &&
            dashboardPost.startStaus == 2
          ) {

            // #### TO CHECK
            if( this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["afterImageCounter"] === 0 ) {
              loading.dismiss();
              (await this.alertCtrl.create({
                message: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["msg"],
                buttons: ['Ok']
              }))
                .present();

            } else {
              this.jobStartStat = false;
              this.jobEndStat = false;
              this.jobFin = true;
              this.finishTime = this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["datetime"];
              console.log(this.finishTime);
              loading.dismiss();
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
          this.getActiveJobByRequest();
        },
        err => {
          loading.dismiss();
          console.log(err);
        }
      );
  }

  //#### PICK SUB STAFF FOR THE JOB AND REFERESH IT AGAIN
  async selectSubStaff(subStaffSelector, jobsData) {
    let loading = await this.loadingCtrl.create({
      message: "Assigning... ",
      spinner: "circles"
    });
    loading.present();

    console.log(subStaffSelector);
 
    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
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
    this.dashboardProvider
      .assignJobToSubStaff(dashboardPost, "assignJobToSubStaff")
      .then(
        async result => {
          let resultParse = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
          console.log(resultParse);
          loading.dismiss();
          (await this.toastCtrl
            .create({
              message: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["msg"],
              duration: 2000,
              position: "top"
            }))
            .present();
        },
        async err => {
          console.log(err);
          loading.dismiss();
          (await this.toastCtrl
            .create({
              message: "Something went wrong. Please try again!",
              duration: 2000,
              position: "top"
            }))
            .present();
        }
      );
  }

  //#### GO TO CHAT PAGE
  gotoChat(jobId: number) {
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



  callToAdmin() {
    this.dashboardProvider.callToAdmin();
  }

  callToCustomer(customerNumber, newJobs) {
    console.log(customerNumber);

    window.open("tel:" + customerNumber, "_system");

    //this.dashboardProvider.callToCustomer(customerNumber);

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS JOB ID
    dashboardPost.job_id = newJobs.jobID;

    //#### THIS IS JOB TYPE
    dashboardPost.type = "active";

    console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.callToCustomer(dashboardPost, "call_counter").then(
      result => {
        let resultParse = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
        console.log(resultParse);
      },
      err => {
        console.log(err);
      }
    );
  }

  // #### SELECT TEAM SIZE HOW MANY PEOPLE INVOLVED INTO THE JOB
  async getteamSize(selectid, jobsData) {
    let loading = await this.loadingCtrl.create({
      message: "Select... ",
      spinner: "circles"
    });
    loading.present();

    //#### THIS WILL RETURN TEAM SIZE WHICH IS CHOOSEN BY SOMEONE WHO LOGGED
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS JOB ID
    dashboardPost.job_id = jobsData.jobID;



    //#### THIS IS SUB STAFF ID
    dashboardPost.team_size = selectid.detail.value;

    //console.log(dashboardPost);


    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.teamWorking(dashboardPost, "team_size_working").then(
      result => {
        let resultParse = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
        //console.log(resultParse);
        loading.dismiss();
        // this.getActiveJobByRequest();
      },
      err => {
        //console.log(err);
      }
    );
  }

    //Check if application having GPS access permission  
    async checkGPSPermission(jobOpt, jobID) {
      await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
        async result => {
          if (result.hasPermission) {
  
            //If having permission show 'Turn On GPS' dialogue
            await this.askToTurnOnGPS(jobOpt, jobID);
          } else {
  
            //If not having permission ask for permission
            await this.requestGPSPermission(jobOpt, jobID);
          }
        },
        async err => {
          //alert(err);
          await (await this.alertCtrl.create({
            header: 'Permission Error',
            message: "Please enable your device location.",
            buttons: [
              {
                text: 'Ok',
                handler: () => console.log('Pressed Ok')
              }
            ]
          }))
          .present();
        }
      );
    }
  
    async requestGPSPermission(jobOpt, jobID) {
      await this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          //console.log("4");
        } else {
          //Show 'GPS Permission Request' dialogue
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
            .then(
              async () => {
                // call method to turn on GPS
                await this.askToTurnOnGPS(jobOpt, jobID);
              },
              async error => {
                //Show alert if user click on 'No Thanks'
                // alert('requestPermission Error requesting location permissions ' + error)
                await (await this.alertCtrl.create({
                  header: 'Location Error',
                  message: "Sorry, Cannot login without knowing your location. Please enable your location from settings.",
                  buttons: [
                    {
                      text: 'Ok',
                      handler: () => console.log('Pressed Ok')
                    }
                  ]
                }))
                .present();
              }
            );
        }
      });
    }

    // Finished Job Assign ReClean Button Action
    async completedJobReCleanBtn(ev){
      //console.log('ReClean Button Clicked');
  
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};
      dashboardPost.staff_type = data.staff_type;
      dashboardPost.staff_id = data.id;
      dashboardPost.job_id = ev.jobID;

      //console.log(dashboardPost);

      let popover = await this.popoverCtrl.create({
        component: AssignRecleanPopupPage,
        componentProps: { jobDetail: ev },
        translucent: true,
        cssClass: 'startpopup'
      });
      popover.style.cssText = '--min-width: 280px; --max-width: 300px;';
      popover.present();

      popover.onDidDismiss().then(
        async (dataReturned) => {
         if (dataReturned.data.length > 0 ){
          //let result = dataReturned.data;
          //console.log(result);
          dashboardPost.selectedstatus = dataReturned.data;
          //console.log(dashboardPost);
            // #### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
            this.dashboardProvider.assignReclean(dashboardPost, "assignReclean").then(
              async result => {
                this.apidata = this.dashboardProvider.returnResponseByNativeHttp(result);
                this.apidata = Array.of(this.apidata);  
                this.defaultDataMsg = this.apidata[0]["result"][0]["msg"];
                const toast = this.toastCtrl.create({
                  message: this.defaultDataMsg,
                  duration: 3000 
                }); 
                (await toast).present();

                this.refreshPage();
              },
              err => {
                //console.log(err);
              }
            );
         } else {
           //do nothing
         }
        }
      );
    }

     // Finished Job Assign Complaint Button Action
     async completedJobComplaintBtn(ev){
      console.log('Complaint Button Clicked');
  
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};
      dashboardPost.staff_type = data.staff_type;
      dashboardPost.staff_id = data.id;
      dashboardPost.job_id = ev.jobID;

      //console.log(dashboardPost);

      let popover = await this.popoverCtrl.create({
        component: AssignComplaintPopupPage,
        componentProps: { jobDetail: ev },
        translucent: true,
        cssClass: 'startpopup'
      });
      popover.style.cssText = '--min-width: 280px; --max-width: 300px;';
      popover.present();

      popover.onDidDismiss().then(
        async (dataReturned) => {
         if (dataReturned.data.length > 0 ){
          //let result = dataReturned.data;
          //console.log(result);
          dashboardPost.selectedstatus = dataReturned.data;
          console.log(dashboardPost);
            // #### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
            this.dashboardProvider.assignComplaint(dashboardPost, "assignComplaint").then(
              async result => {
                this.apidata = this.dashboardProvider.returnResponseByNativeHttp(result);
                this.apidata = Array.of(this.apidata);  
                this.defaultDataMsg = this.apidata[0]["result"][0]["msg"];
                const toast = this.toastCtrl.create({
                  message: this.defaultDataMsg,
                  duration: 3000 
                }); 
                (await toast).present();

                this.refreshPage();
              },
              err => {
                console.log(err);
              }
            );
         } else {
           //do nothing
         }
        }
      );
    }
  
    async askToTurnOnGPS(jobOpt, jobID) {
      await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        async () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          await this.getLocationCoordinates(jobOpt, jobID)
        },
        async error => {
          await (await this.alertCtrl.create({
            header: 'Location Error',
            message: "Sorry, Cannot login without knowing your location. Please enable your location from settings.",
            buttons: [
              {
                text: 'Ok',
                handler: () => console.log('Pressed Ok')
              }
            ]
          }))
          .present();
        }
      );
    }
  
    // Methos to get device accurate coordinates using device GPS
    async getLocationCoordinates(jobOpt, jobID) {
      await this.geolocation.getCurrentPosition().then(async (resp) => {
        this.locationCoords.latitude = resp.coords.latitude;
        this.locationCoords.longitude = resp.coords.longitude;
        this.locationCoords.accuracy = resp.coords.accuracy;
        this.locationCoords.timestamp = resp.timestamp;
  
        // NOW LOGIN
        // await this.loginWithToken();
        await this._jobStartStatus(jobOpt, jobID);
      }).catch(async (error) => {
        await (await this.alertCtrl.create({
          header: 'Location Error',
          message: "Sorry, Cannot login without knowing your location. Please enable your location from settings.",
          buttons: [
            {
              text: 'Ok',
              handler: () => console.log('Pressed Ok')
            }
          ]
        }))
        .present();
      });
    }

    // Redirect to payment page
  async moveToPayment(quoteId, quoteAmount){

    if(quoteAmount == '' ) {
      (await this.alertCtrl.create({
        header: 'Amount Error',
        subHeader: 'Payment cant be done without actual amount. Please add the amount into the quote to book.',
        buttons: [{
          text: 'Cancel',
          handler: () => console.log('Closed')
        }]
      })).present();
      return false;
    }

    // this.navCtrl.push(PaynowPage,{
    //   quoteid:quoteId,
    //   payableAmount: quoteAmount,
    //   pagename: "viewquote"   
    // });

    let dt1: NavigationExtras = {
      queryParams: {
        quoteid:quoteId,
        payableAmount: quoteAmount,
        pagename: "activejob"
      }
    };
    this.router.navigate(['/paynow'], dt1);
  }
}
