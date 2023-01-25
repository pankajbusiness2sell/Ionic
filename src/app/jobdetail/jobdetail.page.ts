import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController, Platform, ActionSheetController, ToastController, PopoverController, LoadingController, ModalController } from '@ionic/angular';
import { BeforedataProvider } from '../services/beforedata/beforedata';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { CookieService } from 'ngx-cookie-service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Content } from '@angular/compiler/src/render3/r3_ast';
import { JobstartpopupPage } from '../popup/jobstartpopup/jobstartpopup.page';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { SignaturePage } from '../signature/signature.page';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.page.html',
  styleUrls: ['./jobdetail.page.scss'],
})
export class JobdetailPage implements OnInit {

  //@ViewChild(Content) content: Content;

  jobDetailData : any;
  action: any;

  imagePath: 'before';

  before: string = 'before';
  after: string = 'after';

  jobData: any;
  relationship: string;

  jobStartStat: boolean = false;
  jobEndStat: boolean = false;
  jobFin: boolean = false;
  globalJobId: number;

  startTime: string;
  finishTime: string;

  popoverDataBack: any = {};
  page: string;

  staff_type_global: number;

  clearTm: any;
  notificationCount: any;

  // FOR CLEANING
  forCleaning: boolean;

  //  EXTRA HOURS
  extraHours: number = 0;

  workType: any;
  gpsInfo: any = {};

  activeJobDetail : any;

  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;

  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: '1',
      text: 'Agreed',
      disabled: false,
      color: 'primary'
    }, {
      id: '2',
      name: 'radio_list',
      value: '2',
      text: 'Denied',
      disabled: false,
      color: 'primary'
    }
  ];


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public alertCtrl?: AlertController,
    public platform?: Platform,
    public actionSheet?: ActionSheetController,
    public beforeImage?: BeforedataProvider,
    public dashboardProvider?: DashboardProvider,
    public toastCtrl?: ToastController,
    public popoverCtrl?: PopoverController,
    public loadingCtrl?: LoadingController,
    private cookieService?: CookieService,   
    private modalController?: ModalController,
    //public viewCtrl?: ViewController,
    public diagnostic?: Diagnostic,
    public geolocation?: Geolocation
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.activeJobDetail) {
        this.jobDetailData = JSON.parse(params.activeJobDetail);
        if(params.action){
          this.action = params.action;
        } else {
          this.action = 0;
        }

        this.page = params.page;
      }

    });

  }

  async ngOnInit() {

    let loading = await this.loadingCtrl.create({
      message: 'Please wait',
      spinner: 'circles'
    });
    //loading.present();

    this.forCleaning = true;
    this.extraHours = 0;
    this.workType = 0;

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    console.log('User data : ', data);

    this.staff_type_global = data.staff_type;

    this.workType = +data.work_type;
    console.log(this.workType)

    if( this.cookieService.get('unreader') ) {
      this.clearTm = setInterval(() => {
        this.notificationCount = this.cookieService.get('unreader');
      }, 2000);
     }


    //console.log(this.page);
    //this.jobDetailData = this.activeJobDetail;
    console.log(this.jobDetailData);
    //console.log('ok done');

    this.jobData = this.jobDetailData.result[0].data.all_active_jobs[0];
    console.log('this.jobData :: >', this.jobData);

    this.relationship = this.jobData.upsell;
    this.globalJobId = this.jobData.jobID;

    if( this.jobData.calculateRemovalData.length )
      this.extraHours = this.jobData.calculateRemovalData[0].extraHour;
    else
      this.extraHours = 0;

    // REMOVAL
    if(this.jobData.cleaning_type == 1) {
      this.forCleaning = false;
    }

    //#### CHECK JOB START STATUS
    if( this.page === 'reclean' ) {

      if( this.jobData.startTime === '0000-00-00 00:00:00' ) {
        this.jobStartStat = true;
        this.jobEndStat = false;
        this.jobFin = false;
        this.startTime = this.jobData.startTime;
        this.finishTime =this.jobData.end_time;
      } else {

        if( this.jobData.end_time === '0000-00-00 00:00:00' ) {
          this.jobStartStat = false;
          this.jobEndStat = true;
          this.jobFin = false;
          this.startTime = this.jobData.startTime;
          this.finishTime =this.jobData.end_time;
        } else {
          this.jobStartStat = false;
          this.jobEndStat = false;
          this.jobFin = true;
          this.startTime = this.jobData.startTime;
          this.finishTime =this.jobData.end_time;
        }

      }

    } else {

      if( this.jobData.startTime === 'Not Started' ) {
        this.jobStartStat = true;
        this.jobEndStat = false;
        this.jobFin = false;
        this.startTime = this.jobData.startTime;
        this.finishTime =this.jobData.finishTime;
      } else {
        if (this.jobData.startTime === 'Not Finished') {
          this.jobStartStat = false;
          this.jobEndStat = true;
          this.jobFin = false;
          this.startTime = this.jobData.startTime;
          this.finishTime =this.jobData.finishTime;
        } else {

          if(this.jobData.finishTime === 'Not Finished') {
            this.jobStartStat = false;
            this.jobEndStat = true;
            this.jobFin = false;
            this.startTime = this.jobData.startTime;
            this.finishTime =this.jobData.finishTime;
          } else {
            this.jobStartStat = false;
            this.jobEndStat = false;
            this.jobFin = true;
            this.startTime = this.jobData.startTime;
            this.finishTime =this.jobData.finishTime;
          }
          //// // // console.log('finishing.......');
        }
      }

    }

    if( this.jobEndStat == this.jobStartStat ) {
      this.jobStartStat = false;
      this.jobEndStat = false;
      this.jobFin = true;
    }


    //// // // console.log(localStorage.getItem('adminNum'));

    //#### NEED TO BE SCROLL TO BOTTOM
    if( this.action === 1 ) {

      //#### GET SCROLL DOWN IMMEDIATELY
      this.ScrollToBottom();

      //#### SAVE READ NOTES
      this.readJobNotes();
    }

    // ACTIVITY OFF
    //loading.dismiss();

    // #### IF DOPNT HAVE UPLOAD THE CHECKLIST BEFORE BUT JOB IS DONE
    // if( this.jobData.checklist_status === "0" )
    // this.pictureEvent(this.jobData);

    console.log('Yeah, this is done');

  }


  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail.value);
    this.selectedRadioGroup = event.detail;
  }


  //#### SAVE READ NOTES WHEN TAP ON NOTES ICON
  readJobNotes() {
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
    dashboardPost.job_id = this.globalJobId;

    this.dashboardProvider.readJobNotes(dashboardPost, 'readJobNotes')
    .then((result) => {
      //// // // console.log(result);
    }, (err) => {
      // // // console.log(err)
    })

  }



  ScrollToBottom(){
    var element = document.getElementById("myLabel");
    // I can't remember why I added a short timeout,
    // but you might be able to use ngzone instead.
    // the below works great though.
    setTimeout(()=>{element.scrollIntoView({behavior: "smooth"})},500);
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
  }

  // #### FOR REMOVALS
  _startRemovalJob = (jobData) => {

    //#### CHECK IF UNPAID, POPOVER WILL NOT OPRN AND ITS FLASHIGN THE ALERT.
    if( jobData.jobpaidstatus === '0' ) {
      // let activeJob = new ActivejobsPage(
      //   this.loadingCtrl,
      //   this.toastCtrl,
      //   this.dashboardProvider,
      //   this.navCtrl,
      //   this.navParams,
      //   this.alertCtrl,
      //   this.platform,
      //   this.actionSheet,
      //   this.popoverCtrl
      // );
      // activeJob.checkPaidStatusBeforeJobStart(jobData);
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
    dashboardPost.job_id = this.globalJobId;

    // // // console.log(dashboardPost);

    //#### INVOKE SERVICE FOR PLAY OR COMPLETE JOB
    this.dashboardProvider.jobStartStatus( dashboardPost, 'jobStartStatus' )
    .then( async (result) => {
      // // // console.log(result);

      //#### CHECK STATUS FOR START OR COMPLETE
      const jobStartStausInResult = this.dashboardProvider.returnResponseByNativeHttp(result)['status'];
      if( jobStartStausInResult === 200 && dashboardPost.startStaus == 1 ) {
        this.jobStartStat = false;
        this.jobEndStat = true;
        this.jobFin = false;
        this.startTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];

        
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

        
        (await this.toastCtrl.create({
          message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
          duration: 2000,
          position: 'top'
        })).present();

        // START UPLOAD CHECKLIST THROUGH
        this.pictureEvent(this.jobData);
      }

    }, (err) => {
      // // // console.log(err);
    })

  }

  // #### FOR CLEANING
  async openPopoverInner(jobData) {

    //#### CHECK IF UNPAID, POPOVER WILL NOT OPRN AND ITS FLASHIGN THE ALERT.
    if( jobData.jobpaidstatus === '0' ) {
      // let activeJob = new ActivejobsPage(
      //   this.loadingCtrl,
      //   this.toastCtrl,
      //   this.dashboardProvider,
      //   this.navCtrl,
      //   this.navParams,
      //   this.alertCtrl,
      //   this.platform,
      //   this.actionSheet,
      //   this.popoverCtrl
      // );
      //   activeJob.checkPaidStatusBeforeJobStart(jobData);
      return false;
    }


    let popover = await this.popoverCtrl.create({
      component: JobstartpopupPage,
      componentProps: { jobDetail: jobData },
      translucent: true
    });
    popover.present();

    //#### WHEN DISMISS THE POPOVER AFTER GETTING RESULT
    //#### GET FROM POPVER ALL THE VALUE ( OBJECT | ARRAY | SINGLR ITEM | NULL )
    popover.onDidDismiss().then( async (dataReturned) => {

      if(dataReturned.data === null || dataReturned.data === undefined) {

      } else {
        let result = JSON.parse(dataReturned.data);
        let jobStartStausInResult = result.status;

        //this.startTime = dataBack.result[0].datetime;

        if( jobStartStausInResult === 200 ) {
          this.jobStartStat = false;
          this.jobEndStat = true;
          this.jobFin = false;
          this.startTime = result['result'][0]['datetime'];

          
          (await this.toastCtrl.create({
            message: result['result'][0]['msg'],
            duration: 2000,
            position: 'top'
          })).present();
        }
      }

    });
  }

  //#### CALL TO OTHER CLEANERS
  callToOtherCleaners(number) {
    window.open('tel:'+number, '_self');
  }

  //### FOR INVOKING CALL FROM CORE OF DEVICE
  callTo(number, newJobs) {

    window.open('tel:'+number, '_self');

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
    if(this.page === 'reclean') {
      dashboardPost.type = 'reclean';
    } else if(this.page === 'active') {
      dashboardPost.type = 'active';
    }

    // // // console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.callToCustomer( dashboardPost , 'call_counter' )
    .then((result) => {
      // let resultParse = JSON.parse(JSON.stringify(result));
      // // // console.log(resultParse);
    }, (err) => {
      // // // console.log(err);
    });

  }

  //#### FOR INVOKING CALL FROM CORE OF DEVICE
  //#### CALL TO ADMIN THROUGH
  callToAdmin() {

    let adminNum = localStorage.getItem('adminNum');
    window.open('tel:'+adminNum, '_self');

  }

  //#### ADD ACTIONE TO CHOOSE WICH WNST TO PERFORM OR CLOSE IT
  pictureEvent(jobData) {
    console.log("workType: " + this.workType);
    // CLEANING
    if(this.workType === 1)
      this._filterByWorkTypeCleaning(jobData);
    else
      this._filterByWorkTypeRemoval(jobData);

  }

  // #### CHOOSE OPTION ACCORDING TO CLEANING AND REMOVALS
  _filterByWorkTypeRemoval = async (jobData) => {

    
    (await this.actionSheet.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Before',
          handler: () => {
            // this.navCtrl.push(ImagebeforePage, {
            //   jobDataForBeforePage: this.jobData
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
            // this.navCtrl.push(ImageafterPage, {
            //   jobDataForAfterPage: this.jobData
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
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })).present();

  }

  // #### CHOOSE OPTION ACCORDING TO CLEANING AND REMOVALS
  _filterByWorkTypeCleaning = async (jobData) => {

    
    (await this.actionSheet.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Before',
          handler: () => {
            // this.navCtrl.push(ImagebeforePage, {
            //   jobDataForBeforePage: this.jobData
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
            // this.navCtrl.push(ImageafterPage, {
            //   jobDataForAfterPage: this.jobData
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
        },
        {
          text: 'No Guarantee Images',
          handler: () => {
            // this.navCtrl.push(GuaranteePage, {
            //   jobDataForBeforePage: jobData,
            //   action: 3
            // });
            let dt5: NavigationExtras = {
              queryParams: {
                jobDataForBeforePage: JSON.stringify(jobData),
                action: 4
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

  }

  //#### CHOOSE UPSELL
  chooseUpSell(jobId, event) {

    console.log("upsell",event.detail.value);


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
    dashboardPost.upsell = event.detail.value; //this.relationship;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = jobId;

    this.dashboardProvider.chooseUpSell(dashboardPost, 'chooseUpSell')
    .then((result) => {

    }, (err) => {
      console.log(err)
    })

  }

  // #### GET GPS AND LOCATION INFORMATION
  // #### EITHER IS ENABLED OR NOT
  getGps = async (jobOpt) => {

    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'circles'
    });
    (await loading).present();
    
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

            loading.dismiss();
            // alert(this.gpsInfo.latitude + "----" + this.gpsInfo.longitude)
            this._jobStartStatus(jobOpt);
           }).catch(async (error) => {
            loading.dismiss();
             console.log('Error getting location', error); 
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
  jobStartStatus = async (jobOpt) => {
    try {
      await this.getGps(jobOpt)
    }
    catch(err) {
      alert('Error in location, Please check your location permission into your device settings.')
      return false;
    }
  }

  //#### START JOB AND COMPLETE
  _jobStartStatus( jobOpt ) {

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
    dashboardPost.startStaus = jobOpt;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = this.globalJobId;

    // #### FOR REMOVALS
    if(this.forCleaning === false) {
      dashboardPost.forRemovals = true;
    } else {
      dashboardPost.forRemovals = false;
    }

    // // // console.log(dashboardPost);

    //#### INVOKE SERVICE FOR PLAY OR COMPLETE JOB
    this.dashboardProvider.jobStartStatus( dashboardPost, 'jobStartStatus' )
    .then( async (result) => {
      // // // console.log(result);

      //#### CHECK STATUS FOR START OR COMPLETE
      const jobStartStausInResult = this.dashboardProvider.returnResponseByNativeHttp(result)['status'];
      if( jobStartStausInResult === 200 && dashboardPost.startStaus == 1 ) {
        this.jobStartStat = false;
        this.jobEndStat = true;
        this.jobFin = false;
        this.startTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];
        
        
        (await this.toastCtrl.create({
          message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
          duration: 2000,
          position: 'top'
        })).present();

      }  else if (jobStartStausInResult === 200 && dashboardPost.startStaus == 2) {

        // #### THIS IS SMAL LCHECK FOR CLEANING AND REMOVAL STOPPING JOB INSTANTLY
        if(this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["instant_stop"] 
          && 
          this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["instant_stop"] === true) {

            (await this.alertCtrl.create({
            header: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["msg"],
            buttons: ['Ok']
          }))
            .present();

            return;
        }

        if( this.forCleaning === true ) {
          if( (this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["afterImageCounter"] === 0) ) {
          (await this.alertCtrl.create({
              header: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0]["msg"],
              buttons: ['Ok']
            }))
            .present();

          } else {
            this.jobStartStat = false;
            this.jobEndStat = false;
            this.jobFin = true;
            this.finishTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];

            
            (await this.toastCtrl.create({
              message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
              duration: 2000,
              position: 'top'
            })).present();
            
          }
        } else if(this.forCleaning === false) {

          // #### STOP STATUS CHANGETO COMPLETE
          // #### AFTER GETTING 200 STATUS

          this.jobStartStat = false;
          this.jobEndStat = false;
          this.jobFin = true;
          this.finishTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];

          
          (await this.toastCtrl.create({
            message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
            duration: 2000,
            position: 'top'
          })).present();

          // #### UPDATING THE JOBDETAIL DATA
          this.jobDetailData = result;
          // // // console.log(this.jobDetailData);
          // // // console.log('ok done');
          this.jobData = this.jobDetailData.result[0].data.all_active_jobs[0];
          // // // console.log(this.jobData);
          this.ScrollToBottom()

          //#### GET SCROLL DOWN IMMEDIATELY
          return Promise.resolve()
          .then(
            scrollDown => this.ScrollToBottom()
          )
          .then(
            data => {
              // #### OPEN OPTION TO UPLOAD CHECKLIST
              if(this.workType === 2)
              this.pictureEvent(this.jobData);
            }
          );
        }

      }

    }, (err) => {

    })

  }

  // #### ADD MORE FILEDS FOR REMOVALS
  addMoreFileds(dashboardPost: any) {
    if(this.forCleaning === false) {
      dashboardPost.forRemovals = true;
    }
   return dashboardPost;
  }

  //#### START JOB AND COMPLETE
  jobStartStatusForReclean( jobOpt ) {

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
    dashboardPost.startStaus = jobOpt;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = this.globalJobId;

    // // // console.log(dashboardPost);

    //#### INVOKE SERVICE FOR PLAY OR COMPLETE JOB
    this.dashboardProvider.jobStartStatus( dashboardPost, 'reCleanButton' )
    .then( async (result) => {
      // // // console.log(result);

      //#### CHECK STATUS FOR START OR COMPLETE
      const jobStartStausInResult = this.dashboardProvider.returnResponseByNativeHttp(result)['status'];
      if( jobStartStausInResult === 200 && dashboardPost.startStaus == 3 ) {
        this.jobStartStat = false;
        this.jobEndStat = true;
        this.jobFin = false;
        this.startTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];

        
        (await this.toastCtrl.create({
          message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
          duration: 2000,
          position: 'top'
        })).present();
        
      } else if( jobStartStausInResult === 200 && dashboardPost.startStaus == 4 ) {
        this.jobStartStat = false;
        this.jobEndStat = false;
        this.jobFin = true;
        this.finishTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];

        
        (await this.toastCtrl.create({
          message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
          duration: 2000,
          position: 'top'
        })).present();
        
      }

      // this.ngOnInit();

    }, (err) => {
      // // // console.log(err);
    })

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

    //#### THIS IS STAFF name
    dashboardPost.staff_name = data.name;

    // // // console.log(dashboardPost);

    this.dashboardProvider.jobStartStatus(dashboardPost, 'reCleanButton')
      .then(async (result) => {

             //#### CHECK STATUS FOR START OR COMPLETE
      const jobStartStausInResult = this.dashboardProvider.returnResponseByNativeHttp(result)['status'];
      if( jobStartStausInResult === 200 && dashboardPost.startStaus == 3 ) {
        this.jobStartStat = false;
        this.jobEndStat = true;
        this.jobFin = false;
        this.startTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];
        
        
        (await this.toastCtrl.create({
          message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
          duration: 2000,
          position: 'top'
        })).present();

      } else if( jobStartStausInResult === 200 && dashboardPost.startStaus == 4 ) {
        this.jobStartStat = false;
        this.jobEndStat = false;
        this.jobFin = true;
        this.finishTime = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['datetime'];

        
        (await this.toastCtrl.create({
          message: this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['msg'],
          duration: 2000,
          position: 'top'
        })).present();
        
      }

      }, (err) => {
      // // // console.log(err)
    });
  }


  hello() {
    // // // console.log('testng...');
  }
  //#### GO TO CHAT PAGE
  gotoChat(jobId?: number) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        userDashboardData: JSON.stringify(JSON.parse(localStorage.getItem('afterLoginData'))),
        job_id: this.globalJobId
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }

  callToCustomer(customerNumber, newJobs) {

    // // // console.log(newJobs);

    // console.log(customerNumber);
    // return false;

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
    dashboardPost.type = 'realestate';

    dashboardPost.rs_number = customerNumber;

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.callToCustomer( dashboardPost , 'call_counter' )
    .then((result) => {
      // let resultParse = JSON.parse(JSON.stringify(result));
      // // // console.log(resultParse);
    }, (err) => {
      // // // console.log(err);
    });

  }

  async openSignaturePad() {
    let modal = null;
    modal = await this.modalController.create({
      component : SignaturePage,
      componentProps: {
        'activeJobDetail': JSON.stringify(this.jobDetailData)
      }
    });
    modal.present();

    //on dismiss get data
    modal.onDidDismiss(data => {
      // // // console.log('MODAL DATA', data);
      // this.hotellocation=data.id; //return data
      if( data.activeJobDetail !== undefined ) {
        // // // console.log(data.activeJobDetail);
        this.jobDetailData = data.activeJobDetail;
        // // // console.log(this.jobDetailData);
        this.jobData = this.jobDetailData.result[0].data.all_active_jobs[0];
        // // // console.log(this.jobData);
        // // // console.log('ok done');
        // this.jobData = this.jobDetailData.result[0].data.all_active_jobs[0];
        // // // // console.log(this.jobData);
      }
    });
  }

  // #### ADD EXTRA HOURS
  async addHours() {

     let loading = await this.loadingCtrl.create({
      message: 'Please wait, While we add extra hours...',
      spinner: 'circles'
    });
    loading.present();

    //#### THIS WILL RETURN THE JOB DETAIL
    //#### APPLIED DETAIL DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS JOB ID
    dashboardPost.job_id = this.jobData.jobID;

    //#### THIS IS QUOTE ID
    dashboardPost.quote_id = this.jobData.quote_id;

    //#### THIS IS EXTRA HOUR
    dashboardPost.extraHour = this.extraHours;

    //#### THIS IS APPLIED WORK HOURS
    dashboardPost.nohr = this.jobData.calculateRemovalData[0].totalnohr;

    // // // console.log(dashboardPost);

    // //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.addextra_hour( dashboardPost , 'addextra_hour' )
    .then((result) => {
      loading.dismiss();
      this.jobData = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0].data.all_active_jobs[0];
      this.jobDetailData = this.dashboardProvider.returnResponseByNativeHttp(result);
    }, (err) => {
      // // // console.log(err);
      loading.dismiss();
    });

  }

}
