import { Component, OnInit, ViewChild } from '@angular/core';
import {Injectable} from '@angular/core';
import { AuthServiceProvider } from './../services/auth-service/auth-service';
import { Device } from '@ionic-native/device/ngx';
import { DashboardProvider } from './../services/dashboard/dashboard';
import { AlertController, LoadingController, MenuController, Platform } from '@ionic/angular';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { EventsService } from './../events.service';
//import {EventsService} from './../services/events/events.service';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

Injectable({
  providedIn: 'root'
})  

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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  locationCoords: any;
  timetest: any;

  @ViewChild('mobile') mobile;
  @ViewChild('password') password;

  loginStorage: any = {};
  afterLogin: any;
  afterLoginError: any;
  loginButtenText: string = 'Login';
  public data: any;

  public deviceInfo: deviceInterface = {};
  public gpsInfo: gpsInterface = {};

  cookieValue = '';

  constructor(
    // public navCtrl: NavController, 
    // public navParams: NavParams,
    public authServe: AuthServiceProvider,
    public alertCtrl: AlertController,    
    public loadingCtrl: LoadingController,
    private device: Device,
    public menu: MenuController,
    public events: EventsService,
    public dashboardProvider: DashboardProvider,
    //private oneSignal: OneSignal,
    //public cookieService: CookieService,
    private diagnostic: Diagnostic,
    public platform: Platform,
    private router: Router,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
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
    this.menu.enable(false);
    this.getInfo();
    //#### CHECK LOGIN DATA IS PRESENT
    this.loginStorage = localStorage.getItem('afterLoginData');
    if( localStorage.getItem('afterLoginData') ) {
      //this.navCtrl.push(DashboardPage);
      this.router.navigate(['/dashboard']);    
    }
  }

  ionViewDidLoad() {
    this.menu.enable(false);
    // console.log('ionViewDidLoad LoginPage');

    // //this.getWelcomePageData();

    // this.getInfo();
    // // this.getGps();

    // //#### CHECK LOGIN DATA IS PRESENT
    // this.loginStorage = localStorage.getItem('afterLoginData');
    // if( localStorage.getItem('afterLoginData') ) {
    //   //this.navCtrl.push(DashboardPage);
    //   this.router.navigate(['/dashboard']);    
    // }

  }

  async login2() {
    // var useronesignalid = localStorage.getItem('usersignalid');
    // await this.loginWithToken();
    //await this.checkGPSPermission();
    let platforms = this.platform.platforms();
    console.log(platforms);        
    if( this.platform.is("desktop") ) {
        await this.loginWithToken();
    } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
        await this.checkGPSPermission();
    }
  }

  login = async () => {
    //await this.getGps();    
    await this.login2()
  }

  loginWithToken = async () => {
    

    const loading = await this.loadingCtrl.create({
      spinner: 'circles',  
      message: 'Please wait',
      });
      await loading.present();
  
      const loginData : any = {};
      loginData.mobile = this.mobile.value;
      loginData.password = this.password.value;
      loginData.device_info = this.deviceInfo;
      loginData.device_id = localStorage.getItem('usersignalid'); // this.cookieService.get('usersignalid');
      loginData.platform = this.deviceInfo.platform;
      loginData.latitude = this.gpsInfo.latitude;
      loginData.longitude = this.gpsInfo.longitude;
     
      console.log('----------------')
      console.log(loginData);
      console.log('----------------')
  
      await this.authServe.login(loginData, 'loginTest')
      .then((result) => {
  
        //#### FLUSH LOADER   
        loading.dismiss();
  
        // #### BECAUSE NEW NATIVE PACKAGE IS INTRODUCED
        // #### AFTER SOME AMENDMENTS, CAN HAVE USE LOCALSTORAGE AGAIN
        this.afterLogin = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['data'][0];

        console.log(this.afterLogin);
  
        // if( localStorage.getItem('afterLoginData') == null )
  
        if( !localStorage.getItem('afterLoginData') ) {                
          //console.log(result['data']);
          localStorage.setItem('afterLoginData', JSON.stringify(this.afterLogin));
        }
  
        this.events.publish('user:created', {
          user: {},
          time: new Date()
        }); 

        // this.events.afterLogin();

      
        //#### NAVIGATE TO DASHBOARD
        //this.navCtrl.push(DashboardPage);
        this.router.navigate(['/dashboard']);
        //this.router.navigateByUrl('/dashboard');
  
      }, (err) => {
        //#### FLUSH LOADER
        loading.dismiss();
        this.loginButtenText = 'LOGIN';
        console.log(err)
        this.afterLoginError = this.dashboardProvider.returnResponseByNativeHttpError(err); //Array.of(err);
      })
    }

  async findTokenAndLogin() {
    // this.oneSignal.startInit('a9dceebc-c9f7-4ec1-9ceb-29861f063f52', '421302254506');
    // this.oneSignal.endInit();
    // this.oneSignal.getPermissionSubscriptionState().then((value) => {});
    // this.oneSignal.getIds().then((id) => {
    //   localStorage.setItem('usersignalid', id.userId);
    //   console.log('----------------')
    //   localStorage.getItem('useronesignalid')
    //   console.log('----------------')
    //   this.loginWithToken();
    // });
  }

  gotoChat() {

    this.menu.close();
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userDashboardData: JSON.stringify(JSON.parse(localStorage.getItem('afterLoginData'))),
        job_id: 0
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
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

    console.log('-------------');
    console.log(this.device);
    console.log('-------------');
  }

  // dashboard() {
  //   this.navCtrl.pop();
  // }

  getGps = async () => {

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'circles'
    });
    await loading.present();

    await this.platform.ready()
    .then(async () => {
      await this.diagnostic.isLocationEnabled()
      .then( async (state) => {  
        console.log(state);
        if( state == false ) {
          loading.dismiss();
          this.loginButtenText = 'LOGIN';
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
        } else {      
          let options = {timeout: 10000, enableHighAccuracy: false};
          this.loginButtenText = 'Checking Location...';
          await this.geolocation.getCurrentPosition(options).then(async (resp) => {
            this.gpsInfo.latitude = resp.coords.latitude;
            this.gpsInfo.longitude = resp.coords.longitude;           
            loading.dismiss();
            // #### START LOGIN PROCESS AFTER SUCCESSUL LOCATION ATTEMPT
            var useronesignalid = localStorage.getItem('usersignalid');
            console.log('Login IN');
            console.log('-------------', useronesignalid);
            if( useronesignalid && useronesignalid !== null ) {
              this.loginButtenText = 'VERIFYING...';
              await this.loginWithToken();
            } else {
              this.loginButtenText = 'VERIFYING...';
              // #### Find token than subscribe to login
              await this.findTokenAndLogin();
            }
           }).catch(async (error) => {
             console.log('Error getting location', error); 
             loading.dismiss();
             this.loginButtenText = 'LOGIN';
             await (await this.alertCtrl.create({
               header: 'Location access is required',
               message: "Please go to your device settings and switch OFF and ON location once again.",
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
        this.loginButtenText = 'LOGIN';
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
    })
  }

  //Check if application having GPS access permission  
  async checkGPSPermission() {
    this.getInfo();    
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
      err => {
        alert(err);
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

  async askToTurnOnGPS() {
    await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      async () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        await this.getLocationCoordinates()
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
  async getLocationCoordinates() {
    await this.geolocation.getCurrentPosition().then(async (resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;

      console.log('this.locationCoords ::', this.locationCoords);
      this.gpsInfo.latitude = this.locationCoords.latitude;
      this.gpsInfo.longitude = this.locationCoords.longitude;
      // NOW LOGIN
      await this.loginWithToken();
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

}
