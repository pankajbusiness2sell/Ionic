import { Component, OnInit } from '@angular/core';
import { DashboardProvider } from 'src/app/services/dashboard/dashboard';
import { AlertController, Platform, LoadingController, NavParams, PopoverController } from '@ionic/angular';

import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-jobstartpopup',
  templateUrl: './jobstartpopup.page.html',
  styleUrls: ['./jobstartpopup.page.scss'],
})
export class JobstartpopupPage implements OnInit {

  locationCoords: any;
  timetest: any;

  [x: string]: any;

  forRooms: number;
  forProperty: number;
  popoverData:any = {};
  jobData: any;
  gpsInfo: any = {};

  constructor(
    public dashboardProvider: DashboardProvider,    
    public alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private diagnostic: Diagnostic,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private navParams: NavParams
  ) { }

  ngOnInit() {

    //alert('Open');
    console.log('ionViewWillEnter JobstartpopupmodalPage');
     this.forRooms = 1;
     this.forProperty = 0;
     this.popoverData = this.navParams.data.jobDetail; //JSON.parse(this.viewCtrl.data.jobDetail);

     //this.jobData = this.popoverData.result[0].data.all_active_jobs[0];
     this.jobData = this.popoverData;

     console.log('------------', this.jobData)
  }

  //#### ACCEPTED || DENIED BEFORE JOB START AND SEND THE DETAIL TO ADMIN IMMEDIATELY
  //#### BUT JOB WILL START WOTHOUT ANY MESSAGE.
  //#### CHOOSE OPTION BEFORE JOB
  acceptDetailBeforeJobStart = async () => {
    await this.platform.ready()
    .then(async () => {
      let platforms = this.platform.platforms();
      console.log(platforms);    
      this.platformList = platforms.join(', ');    
      if( this.platform.is("desktop") ) {
        await this.startJobAfterLocationAccess();  
      } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
        await this.checkGPSPermission();  
      }
    });    
  }

  // #### INVOKE TO START JOB AFTER GETTING LOCATION
  startJobAfterLocationAccess = async () => {

    let loading = await this.loadingCtrl.create({
      message: "Please Wait",
      spinner: "circles"
    });
    loading.present();

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
    dashboardPost.forRooms = this.forRooms;

    //#### THIS IS STAFF ID
    dashboardPost.forproperty = this.forProperty;

    //#### THIS IS STAFF ID
    dashboardPost.job_id = this.jobData.jobID;

    //#### THIS IS STAFF ID
    dashboardPost.startStaus = 1;

    //#### THIS IS STAFF ID
    dashboardPost.staff_name = data.name;

    //#### THIS IS STAFF LATITUDE
    dashboardPost.latitude = this.gpsInfo.latitude;

    //#### THIS IS STAFF LONGITUDE
    dashboardPost.longitude = this.gpsInfo.longitude;

    console.log('-----------START-----------');
    console.log(dashboardPost);
    console.log('---------------------------')

    await this.dashboardProvider.jobStartStatus(dashboardPost, 'jobStartStatus')
      .then(async (result) => {

        if( result !== null ) {

          loading.dismiss();
          console.log('**********************')
          console.log(JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)));
          console.log('**********************')
          await this.popoverCtrl.dismiss(JSON.stringify(this.dashboardProvider.returnResponseByNativeHttp(result)));
        } else {
          loading.dismiss();
          await this.popoverCtrl.dismiss(null);
        }
      }, (err) => {
        loading.dismiss();
        console.log(err)
    });
  }

  //#### FORCELY DISMISS POPOVER
  async onDismissPopover() {
    await this.popoverCtrl.dismiss();
  }

  //Check if application having GPS access permission
  async checkGPSPermission() {
    await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      async result => {
        if (result.hasPermission) {
          //If having permission show 'Turn On GPS' dialogue
          await this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          await this.requestGPSPermission();
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

  async requestGPSPermission() {
    await this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            async () => {
              // call method to turn on GPS
              await this.askToTurnOnGPS();
            },
            async error => {
              //Show alert if user click on 'No Thanks'
              // alert('requestPermission Error requesting location permissions ' + error)
              await (await this.alertCtrl.create({
                header: 'Location Error',
                message: "Job can't start and stop without knowing your location",
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

  async askToTurnOnGPS() {    
    await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      async () => {
        // When GPS Turned ON call method to get Accurate location coordinates        
        await this.getLocationCoordinates()
      },
      async error => {
        await (await this.alertCtrl.create({
          header: 'Location Error',
          message: "Job can't start and stop without knowing your location, Please enable your device location.",
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
  async getLocationCoordinates() {

    await this.geolocation.getCurrentPosition().then(async (resp) => {    
      
      console.log("done");
      console.log(resp);
      this.gpsInfo.latitude = resp.coords.latitude;
      this.gpsInfo.longitude = resp.coords.longitude;
      this.gpsInfo.accuracy = resp.coords.accuracy;
      this.gpsInfo.timestamp = resp.timestamp;

      console.log('this.gpsInfo:--:', this.gpsInfo);
      
      // PROBLEM IN BELOW FUNCTION
      await this.startJobAfterLocationAccess();
    }).catch(async (error) => {  
      await (await this.alertCtrl.create({
        header: 'Server Error',
        message: "Please contact to administrator. "+error ,
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

}
