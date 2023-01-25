import { Component } from '@angular/core';

import { AlertController, LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { pusherservice } from './services/pusherservice';
import { CookieService } from 'ngx-cookie-service';       
import { EventsService } from './events.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DashboardProvider } from './services/dashboard/dashboard';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userData: any;
  userDashboardData: any;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route: ActivatedRoute,
    public router: Router,
    public menu: MenuController,
    private oneSignal: OneSignal,
    public dashboardProvider: DashboardProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private _pusherservice: pusherservice,
    private cookieService: CookieService,
    private events: EventsService
  ) {
    this.initializeApp();
  }


  ionViewDidEnter(){
    document.addEventListener("backbutton", function(e){
      console.log("Disabled Back Button");
    }, false);
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {        
        this.setupPush();
      }

      this.events.subscribe('user:created', (user) => {

        //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
        this.userData = JSON.parse(localStorage.getItem('afterLoginData')).name;
        console.log(this.userData);

        //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
        this.userDashboardData = JSON.parse(localStorage.getItem('afterLoginData'));

        //#### GET INCOMING MESSAGE WHICH WILL COME FROM CHAT
        this.setuppusher();

      });

      this._pusherservice.setchannel();
      this.setuppusher();
    });
  }

  async setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit('532d6358-9b51-47a7-8f4f-5cde35631303', '627750645723');
 
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
 
    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      console.log('Data# :: ', data);
      this.showAlert(title, msg);
    });
 
    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      console.log('Data :: ', data);
      //alert('New Notification Received')
      this.showAlert('Notification opened', 'You already read this before');
    });
 
    this.oneSignal.endInit();
    this.oneSignal.getPermissionSubscriptionState().then((value) => {});
    await this.oneSignal.getIds().then((id) => {      
      localStorage.setItem('usersignalid', id.userId);
      console.log(localStorage.getItem('usersignalid'));
      //alert(localStorage.getItem('usersignalid'));
    });
  }
 
  async showAlert(title, msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `ok`,
          handler: () => {
            // E.g: Navigate to a specific screen
            console.log(localStorage.getItem('usersignalid'));
            // Desired page
          }
        }
      ]
    })
    alert.present();
  }

  setuppusher() {
    let self = this;
    var userdata = JSON.parse(localStorage.getItem('afterLoginData'));
    console.log('Pusher invoking');
    console.log(userdata); 
    if (userdata && userdata.id) {
      var channel = this._pusherservice.getchannel();
      channel.bind('chat_' + userdata.id, (data) => {
        console.log('------CHAT PAGE INCOMING MESSAGE-------');
        console.log(data);

        let ischatpage =  this.router.isActive('/chat', false); // self.nav.getActive().instance instanceof ChatPage;
        console.log(ischatpage);
        if(ischatpage == false)
        {
          // self.gotoChat();

          let unreadCounter = data.unread;
          if (unreadCounter === 0) {
            this.cookieService.set('unreader', unreadCounter);
          } else {
            this.cookieService.set('unreader', unreadCounter);
          }

        }
      });

      channel.bind('my-event', (data) => {
        console.log('------XX-------');
        console.log(data);
        console.log('------XX-------');
      });
    }
  }

  getDeviceId = async () => { 
    let self = this; 

    //#### PUSH NOTIFICATION  
    this.oneSignal.startInit('532d6358-9b51-47a7-8f4f-5cde35631303', '627750645723');

    //#### HANDLED OPEN PUSH NOTIFICATION
    this.oneSignal.handleNotificationOpened().subscribe(data => {

      if (this.userDashboardData) {  
        
        // #### FIRST CHECK TO LOAD ACTIVE 3PM CHECK
        const dataByPage = data['notification']['payload']['additionalData']['data'];  
        // JSON.stringify(JSON.parse(data)['notification']['payload']['additionalData']);
        
        if( dataByPage == 'popup' ) {        

          // alert(data['notification']['payload']['additionalData']['data']);  
          // alert(data['notification']['payload']['additionalData']['job_id']);

          let isactivepage = this.router.isActive('activejobs', true); // self.nav.getActive().instance instanceof ActivejobsPage;
          if(isactivepage == false) {
            // this.nav.push(ActivejobsPage, {
            //   job_id: data['notification']['payload']['additionalData']['job_id']
            // })

            let dt2: NavigationExtras = {
              queryParams: {
                job_id: data['notification']['payload']['additionalData']['job_id']
              }
            };
            this.router.navigate(['/activejobs'], dt2);

          }

        } else { // CHAT PAGE

          // alert(data['notification']['payload']['additionalData']['data']);
          let isactivepage = this.router.isActive('chat', true);
          //let ischatpage = self.nav.getActive().instance instanceof ChatPage;
          if(isactivepage == false) {
            this.gotoChat(data);
          }
        }           
      } else {
        localStorage.setItem('forceToLoad', 'chat');
      }
    });  
    
    this.oneSignal.endInit();    
    this.oneSignal.getPermissionSubscriptionState().then((value) => {});
    await this.oneSignal.getIds().then((id) => {      
      localStorage.setItem('usersignalid', id.userId);
      localStorage.getItem('usersignalid');
      //alert(localStorage.getItem('usersignalid'));  
    });

  }

  gotoChat(data?:any) {
    if(!this.userDashboardData)
    {
      this.userDashboardData = JSON.parse(localStorage.getItem('afterLoginData'));
    }
    this.menu.close();
    // this.nav.push(ChatPage, {
    //   'userDashboardData': JSON.stringify(this.userDashboardData),
    //   'job_id': 0,
    //   'data': JSON.stringify(data)
    // });

    let dt1: NavigationExtras = {
      queryParams: {
        'userDashboardData': JSON.stringify(this.userDashboardData),
        'job_id': 0,
        'data': JSON.stringify(data)
      }
    };
    this.router.navigate(['/chat'], dt1);

    // this.nav.push(ChatPage);
  } 

  //#### NEED ASSITANNCE
  needAssistant() {
    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));

    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.needAssistant(dashboardPost, 'needAssistant')
      .then(async (result) => {
        (await this.alertCtrl.create({ header: 'Our staff will contact to you soon', buttons: ['Ok'] })).present();
      }, async (err) => {
        (await this.alertCtrl.create({ header: 'Something went wrong.', buttons: ['ok'] })).present();
      });
  }

    //#### FOR INVOKING CALL FROM CORE OF DEVICE
  //#### CALL TO ADMIN THROUGH
  callToAdmin() {

    let adminNum = localStorage.getItem('adminNum');
    window.open('tel:' + adminNum, '_self');

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

        this.router.navigate(['/login'])
      // //#### FLUSH ALL LOCAL STORAGE
      localStorage.removeItem('afterLoginData');

      this.menu.close();
      //var nav = this.app.getRootNav();
      //nav.setRoot(LoginPage);
    }, async (err) => {
      loading.dismiss();
      (await this.alertCtrl.create({ header: 'Something went wrong into logout!', buttons: ['Ok'] })).present();
    });
  }

}
