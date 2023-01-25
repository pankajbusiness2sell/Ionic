import { Component, OnInit } from '@angular/core';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { AlertController, ToastController, LoadingController, MenuController, Platform, PopoverController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { EventsService } from '../events.service';
import { TermandconditionPage } from '../termandcondition/termandcondition.page';

interface deviceInterface {
  id?: string,
  model?: string,
  cordova?: string,
  platform?: string,
  version?: string,
  manufacturer?: string,
  serial?: string,
  isVirtual?: boolean,

};

interface gpsInterface {
  latitude?: number,
  longitude?: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  dashBoardData: any = {};
  newJobs: any;
  activeJobs: any;
  recleanJobs: any;
  allowSubStaff: number;
  public unregisterBackButtonAction: any;
  public staff_type_global: number;
  clearTm: any;
  notificationCount: any;
  userDashboardData: any;

  customDisable: boolean;
  public deviceInfo: deviceInterface = {};
  public gpsInfo: gpsInterface = {};
  reviewData: any;
  app_version: boolean;
  bbc_leads: any;
  better_franchisee: any;

  constructor(
    public dashboardProvider: DashboardProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private device: Device,
    public loadingCtrl: LoadingController,
    public menu: MenuController,
    public events: EventsService,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public modalController:ModalController,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {

    

    this.getInfo();

    //#### INVOKED DASHBOARD CALL
    this.getDashboardDataByDefault();

  }

  ionViewWillEnter(){
   this.menu.enable(true);
   this.routerOutlet.swipeGesture = false;
  }

  // doRefresh(event) {
  //   console.log('Begin async operation', event);
    
  //   this.getDashboardDataByDefault();
    
  //   setTimeout(() => {
  //   console.log('Async operation has ended');
  //   event.target.complete();
  //   }, 2000);
  // }

  refreshPage() {    
    this.getDashboardDataByDefault();
    setTimeout(() => {
    console.log('Async operation has ended');
    }, 1000);
  }

  async getDashboardDataByDefault () {

    let loading = await this.loadingCtrl.create({
      message: 'Please wait',
      spinner: 'circles'
    });
    loading.present();

    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    this.userDashboardData = data;

    localStorage.setItem('adminNum', this.userDashboardData.office_number);

    //console.log(localStorage.getItem('adminNum'));
    this.allowSubStaff = data.allow_sub_staff;
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;
    //TODO:change below data after testing
    this.staff_type_global = data.staff_type; 

    //Check is franchise registered to add quote ( if both value are 2 then allow to add )
    this.bbc_leads = data.bbc_leads;
    this.better_franchisee = data.better_franchisee;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    this.dashboardProvider.getDashboardData(dashboardPost, 'dashboard').then((result) => {

      // #### BECAUSE NEW NATIVE PACKAGE IS INTRODUCED
      // #### AFTER SOME AMENDMENTS, CAN HAVE USE LOCALSTORAGE AGAIN
      this.dashBoardData = this.dashboardProvider.returnResponseByNativeHttp(result);
      console.log('-----------dashBoardData--------------')
      console.log(this.dashBoardData);
      console.log('-------------dashBoardData------------')  
      //let dboard = Array.of(this.dashBoardData);

      //  // CHECK VERSION TO SHOW AND NOTIFIY APP PERSON
      // // console.log(dboard[0]['result'][0]['data']['versiondata']['android_version']);
      // if(localStorage.getItem('app_version')) {
      //   if(localStorage.getItem('app_version') !== dboard[0]['result'][0]['data']['versiondata']['android_version']) {
      //     this.app_version = true; // WILL SHOW
      //     console.log('ITS TRUE');
      //     console.log('xxxtttttttxxx ' , this.userDashboardData.work_type);
      //   } else {
      //     this.appVersion.getVersionNumber().then((value) => {
      //       localStorage.setItem('app_version', value);

      //       if(value !== dboard[0]['result'][0]['data']['versiondata']['android_version']) {
      //         this.app_version = true; // WILL SHOW
      //         console.log('ITS TRUE INNER');
      //         console.log('xxxtttttttxxx ' , this.userDashboardData.work_type);
      //       } else {
      //         this.app_version = false; // WILL HIDE
      //         console.log('ITS FALSE INNER');
      //         console.log('ccccccccccc ' , this.userDashboardData.work_type);
      //       }
      //     });
      //   }
      // } else {
      //   // localStorage.setItem('app_version', dboard[0]['result'][0]['data']['versiondata']['android_version']);
      //   console.log('ITS TRUE');
      // }

      loading.dismiss();
      
     if( this.dashBoardData['result'][0]['data']['tnc'] !== "undefined" ) {
       //#### OPEN TANDC
       this.openTandc();
     }

    }, (err) => {
      console.log(err);
    });
  }

  getInfo() {
    this.deviceInfo.id = this.device.uuid;
    this.deviceInfo.model = this.device.model;
    this.deviceInfo.cordova = this.device.cordova;
    this.deviceInfo.platform = this.device.platform;
    this.deviceInfo.version = this.device.version;
    this.deviceInfo.manufacturer = this.device.manufacturer;
    this.deviceInfo.serial = this.device.serial;
    this.deviceInfo.isVirtual = this.device.isVirtual;
  }

  //#### GET NEW JOBS DATA
  getNewJobsData() {
    //this.navCtrl.push(NewjobsPage);
    this.router.navigate(['/newjobs']);
  }

  //#### GET ACTIVE JOBS DATA
  getActiveJobByRequest() {
    //this.navCtrl.push(ActivejobsPage);
    this.router.navigate(['/activejobs']);
  }

  //#### GET ReClean JOBS DATA
  getRecleanJobByRequest() {
    //this.navCtrl.push(RecleanPage);
    this.router.navigate(['/reclean']);
  }

  //#### GET COMPLETE JOBS DATA
  getCompleteJobByRequest() {

    //this.navCtrl.push(CompletejobsPage);
    this.router.navigate(['/completejobs']);  

  }

  //#### GET COMPLETE JOBS DATA
  getAllJobByRequest() {
    //this.navCtrl.push(AlljobsPage);
    this.router.navigate(['/alljobs']);
  }

    //#### OPEN ACCOUNT PAGE
    openAccount() {
      this.getAllJobForAccount();
    }
  
    //#### GET COMPLETE JOBS DATA
    getAllJobForAccount() {
      //this.navCtrl.push(AccountsPage);
      this.router.navigate(['/accounts']);
    }
  
    //#### OPEN MY DETAIL PAGE
    myDetail() {
      //this.navCtrl.push(MydetailPage);
      this.router.navigate(['/mydetail']);
    }
  
    //#### GO TO SUBSTAFF PAGE
    subStaff() {
      //this.navCtrl.push(SubstaffPage);
      this.router.navigate(['/substaff']);
    }

      // GET Lead Setting Data
      leadSetting(){
        this.router.navigate(['/leadsetting']);
      }

      // GET Leads Data
      leads(){
        this.router.navigate(['/leads']);
      }  

      // Load Create Quote Page
      createQuoteFn(){
        //console.log('TEST');
        this.router.navigate(['/createquote']);
      }

      // Load View Quote Page
      viewQuoteFn(){
        this.router.navigate(['/viewquote']);
      }
  
    //#### INVOKE TO LOGOUT
    async logout() {
  
      let loading = await this.loadingCtrl.create({
        message: 'Please wait',
        spinner: 'circles'
      });
      loading.present();
  
      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      var useronesignalid = localStorage.getItem('usersignalid');
  
      const dashboardPost: any = {};
  
      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
      dashboardPost.staff_type = data.staff_type;
  
      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;
  
      //#### THIS IS STAFF IDDEVICE ID 
      dashboardPost.device_id = useronesignalid;
  
      //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
      this.dashboardProvider.logout( dashboardPost , 'logout' )
      .then((result) => {    
        loading.dismiss();         
        //#### FLUSH ALL LOCAL STORAGE
        localStorage.removeItem('afterLoginData');
        //localStorage.clear();
        //this.navCtrl.setRoot(LoginPage);
        this.router.navigate(['/login']);
      }, async (err) => {
        loading.dismiss();
        (await this.alertCtrl.create({
            header: 'Something went wrong into logout!',
            buttons: ['Ok']
          })).present();
      });
  
    }
  
    //#### SEND TO ROASTER PAGE
    roaster() {
      //this.navCtrl.push(AvailabilityPage);
      this.router.navigate(['/availability']);
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

    invokeAlert(init) {

    }

    openPolicy() {
      //this.navCtrl.push(PrivacypolicyPage);
      this.router.navigate(['/privacypolicy']);
    }
    
    testPage(){
      //alert('ddd');

      this.router.navigate(['/testing']);
    }

    _callReviews = async () => {    
      let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'}); loading.present();
  
      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};
  
      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
      dashboardPost.staff_type = data.staff_type;
  
      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;
  
      //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
      this.dashboardProvider.getReview( dashboardPost , 'reviewDetails')
      .then((result) => {
        this.reviewData = this.dashboardProvider.returnResponseByNativeHttp(result)['result']['review_data'];
        loading.dismiss();
        // this.navCtrl.push(ReviewsPage, {
        //   reviewData: JSON.stringify(this.reviewData)
        // })
        let dt1: NavigationExtras = {
          queryParams: {
            reviewData: JSON.stringify(this.reviewData)
          }
        };
        this.router.navigate(['/reviews'], dt1);
      }, (err) => {
        console.log(err);
        this.reviewData = JSON.parse(JSON.stringify(err));
        loading.dismiss();
      })
      .catch(
        (err) => {
          console.log('Error Caught');
        }
      );
    }

    async openTandc() {

      // this.customDisable = true;
      // // let dboard = Array.of(this.dashBoardData);
  
      //  //#### OPEN MODAL AFTER LOGGING AND LANDING ONTO DASHBOARD
       
      //  let popover = this.popoverCtrl.create({ 
      //   component : TermandconditionPage,
      //   componentProps : {
      //     termandconditionText: this.dashBoardData
      //   }
      // });
      // (await popover).present();
  
      // // popover.onDidDismiss(data => {
      // //   if( data == null || data === undefined ) {
      // //     this.customDisable = false;
  
      // //   } else {
      // //     this.customDisable = false;
  
      // //   }
      // // });
  
    }

}
