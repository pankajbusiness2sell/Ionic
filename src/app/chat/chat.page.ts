import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { CookieService } from 'ngx-cookie-service';
import { pusherservice } from '../services/pusherservice';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({ 
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonInfiniteScroll) IonInfiniteScroll: IonInfiniteScroll;
  userDashboardDara: any = {};
  dashboardData: any = {};
  nomorechatdata:boolean=false;
  chat_input: string;
  counter: number;
  clearTm: any;

  //#### FOR ADMIN PART
  adminData: any = {};

  //#### ONLY ONCE WHEN LANDED
  landed: boolean;
  pageChat: boolean = true;

  lat:any;
  lng:any;

  
  userDashboardData:any;
  jobid:any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public dashboardProvider: DashboardProvider, 
    private _pusehrservice: pusherservice, 
    private geolocation: Geolocation, 
    private cookieService: CookieService,
    
    private changeDetectorRef: ChangeDetectorRef
  ) { 

    

    this.route.queryParams.subscribe(params => {
      if (params && params.userDashboardData) {
        this.userDashboardData = JSON.parse(params.userDashboardData);
        this.jobid = params.job_id
      }
    });

    this._pusehrservice.setchannel();
    this.setuppusher();

  }

  ngOnInit() {
    console.log(this.userDashboardData);
    console.log(this.jobid);

    this.landed = false;
    if (this.userDashboardData) {
      //this.userDashboardData = JSON.parse(this.userDashboardData);
      console.log(this.userDashboardData);
      console.log(this.userDashboardData.id);
      this.cookieService.set('unreader', '0');
      this.getChatData(this.userDashboardData, 0);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.IonInfiniteScroll.disabled;

  }

  ionViewWillLeave() {
    // unsubscribe
    this.chat_input = '';
    this.counter = 0;
    if (this.clearTm) { console.log('leave chat screen'); clearTimeout(this.clearTm); }
    clearTimeout(this.clearTm);
  }

  getChatData(staffData, adminId: number) {

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = staffData;
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.admin_id = adminId;

    this.dashboardProvider.getChatData(dashboardPost, 'getChatData')
      .then((result) => {

        this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));

        console.log(this.dashboardData);
        console.log('****************');

        if (this.dashboardData.result[0].data[0].chat === 'undefined') {
          return false;
        }

        console.log(this.dashboardData);
        console.log(this.dashboardData.status);

        //#### SET ADMIN DATA FOR CHAT
        this.adminData = this.dashboardData.result[0].data[0].avail_admin[0];
        console.log(this.adminData);

        //#### SCROLL IMMEDIATELY
        // if (this.landed === false)
        //   this.ScrollToBottom();

        this.ScrollToBottom();
        this.landed = true;
        setTimeout( () => !this.IonInfiniteScroll.disabled, 1000);

        //#### RECURSION START
        // this.clearTm = setTimeout( () => { console.log('chat called'); this.getChatData(staffData, this.adminData.id); } , 5000);

      }, (err) => {
        console.log(err)
      })
  }

  //#### SEND CHAT TEXT
  sendMsg(chatText: string) {

    if (chatText !== undefined) {

      // #### JUST SCROLL FIRST AND START SENDING THE MESSAGE
      this.ScrollToBottom();

      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};


      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
      dashboardPost.staff_type = data.staff_type;

      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;

      //#### THIS IS ADMIN NAME
      dashboardPost.to = this.adminData.name;
       //kk code commite as pusher code is used as per ankit developer changed to 1 val.//this.adminData.name;

      //#### THIS IS ADMIN ID
      dashboardPost.to_id = this.adminData.id;

      //#### THIS IS CHAT TEXT
      dashboardPost.message = chatText;

      //#### THIS IS CHAT TEXT
      dashboardPost.job_id = this.jobid;

      //latlng values
      dashboardPost.lat=this.lat;
      dashboardPost.long=this.lng;

      // var _dashboardPost = {
      //   chat_type: 'staff',
      //   chat_exact_time: new Date(),
      //   message: chatText
      // };

      var _dashboardPost = {
        chat_type: 'staff',
        chat_exact_time: '',
        message: chatText
      };
      _dashboardPost.chat_exact_time = 'just now'; // new Date();
      this.dashboardData.result[0].data[0].chat.push(_dashboardPost);
      this.ScrollToBottom();
      
      //'job_id': jobId      
      this.dashboardProvider.sendChatText(dashboardPost, 'sendChatText')
        .then((result) => {

          //this.dashboardData = JSON.parse(JSON.stringify(result));
          console.log(this.dashboardData);
          console.log(this.dashboardData.status);

          //#### SET ADMIN DATA FOR CHAT
          this.adminData = this.dashboardData.result[0].data[0].avail_admin[0];
          console.log(this.adminData);

          this.ScrollToBottom();

        }, (err) => {
          console.log(err)
        });
      this.chat_input = '';
    }
  }

  ScrollToBottom() {
    var element = document.getElementById("myLabel");
    // element.scrollIntoView({ behavior: "smooth"});

    // I can't remember why I added a short timeout,
    // but you might be able to use ngzone instead.
    // the below works great though.
    setTimeout(() => { element.scrollIntoView({ behavior: "smooth"}) }, 500);
  }
  
  scrolled() { 
    this.getscrolled();
  }

  getscrolled() {

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY


    var firstentry=this.dashboardData.result[0].data[0];

    console.log(firstentry);
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = this.userDashboardData.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = this.userDashboardData.id;

    //#### THIS IS STAFF ID
    dashboardPost.admin_id = 0;
    dashboardPost.last_msg_id = firstentry.last_msg_id;
    //var data={last_msg_id:firstentry.id,
    //staffid:this.userDashboardDar};
    this.dashboardProvider.getChatDataLoadMore( dashboardPost, 'getChatDataLoadMore')
      .then((result) => {
        var  tdashboardData = JSON.parse(JSON.stringify(result));

          this.IonInfiniteScroll.complete();

        if (tdashboardData.result[0].data[0].chat === 'undefined') {
          this.nomorechatdata=true;
         this.IonInfiniteScroll.disabled;
          return false;

        }else{
         !this.IonInfiniteScroll.disabled;
        }

        var existinglist=this.dashboardData.result[0].data[0].chat;
        // this.dashboardData.result[0].data[0].chat=existinglist.concat(tdashboardData.result[0].data[0].chat);
        this.dashboardData.result[0].data[0].chat=tdashboardData.result[0].data[0].chat.concat(existinglist);
         this.dashboardData.result[0].data[0].last_msg_id = tdashboardData.result[0].data[0].last_msg_id;


      }, (err) => {

        console.log(err)

      })
  }

  setuppusher() {
    var self = this;
    if (localStorage.getItem('afterLoginData')) {
      var userdata = JSON.parse(localStorage.getItem('afterLoginData'));

      if (userdata && userdata.id) {
        var channel = this._pusehrservice.getchannel();
        channel.bind('chat_' + userdata.id, function (data) {
          let date = new Date(data.chat_exact_time * 1000);
          data.chat_exact_time = date
          self.dashboardData.result[0].data[0].chat.push(data);
          self.ScrollToBottom();

          if (this.pageChat === true) {
            // self.ScrollToBottom();
          }
          console.log('INCOMING MESSAGe');
          console.log(data);
        });
      }
    }
  }

}
