import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { SmsProvider } from '../services/sms/sms';

@Component({
  selector: 'app-viewquote',
  templateUrl: './viewquote.page.html',
  styleUrls: ['./viewquote.page.scss'],
})
export class ViewquotePage implements OnInit {

  dashboardData: any;
  clearTm: any;
  notificationCount: any;
  staff_type_global: number;
  defaultData: any;
  viewquotetabs: string;
  sms_number: string;
  sms_message: string;
  sms_success: string;
  sms_fail: string;
  getQuoteSMS: any[];
  getQuoteSMSText: any[];
  sendQuoteSmsResponse: any[];
  sendQuoteEmailData: any[];
  smsnotes: string;
  defaultDataMsg: string;
  //smsResponse: string;
  filterquote: any = "3";
  searchStr: any;

  
  constructor(
    private router:Router,
    public loadingCtrl: LoadingController,
    public dashboardProvider?: DashboardProvider,
    public sms?: SmsProvider,
    public toastCtrl?: ToastController,
    public alertCtrl?: AlertController
  ) { 
    this.viewquotetabs = 'allquote';
  }

  ngOnInit() {
    this.dashboardData = {};
    this.notificationCount = '';
    this.getViewQuote(this.viewquotetabs, '', '');
  }

  

  refreshPage() {    
    this.dashboardData = {};
    this.notificationCount = '';
    this.getViewQuote(this.viewquotetabs, '', '');
  }

   //#### CLEAR AND CANCELLED PRESSED
   cancelled() {
    console.log('cancelled');
    this.getViewQuote(this.viewquotetabs, '', '');
  }

  async callToCustomer(customerNumber, qid) {
    console.log(customerNumber);
    
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};
    dashboardPost.staff_type = data.staff_type;
    dashboardPost.staff_id = data.id;
    dashboardPost.cxnum = customerNumber;
    dashboardPost.quoteid = qid;
    //console.log(dashboardPost);
    await this.dashboardProvider.getLeadStatusDD( dashboardPost , 'callToCustomerQuote' )
    .then((result) => {
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
      this.dashboardData = Array.of(this.dashboardData);
      //this.leadstatus = this.dashboardData[0]["result"][0]["leadstatus"];
      console.log(this.dashboardData);
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
    });

    window.open('tel:'+customerNumber, '_system');
  }

  // Fetch Quote List
  async getViewQuote(ev, searchStr: any, evhtml: any){

    if( evhtml != '' ){
      ev = evhtml.detail.value;
    }

    console.log("=======");
    console.log(ev);
    console.log("=======");

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

    //Filter Data
    dashboardPost.filterby = this.filterquote;

    if( ev == 'allquote' ){
      dashboardPost.result_type = 1;
    } else if( ev == 'bookedquote' ) {
      dashboardPost.result_type = 2;
    } else {
      dashboardPost.result_type = 1;
    }

    console.log(searchStr);

    if( searchStr !== undefined && searchStr !== '' && searchStr.length >= 3) {
      //#### THIS IS STAFF ID
      dashboardPost.staff_job_id = searchStr;
    }
    console.log(dashboardPost);
    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.getViewQuoteList( dashboardPost , 'getViewQuoteList' )
    .then((result) => {
      //this.dashboardData = JSON.parse(JSON.stringify(result));
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
      this.dashboardData = Array.of(this.dashboardData);
      this.defaultData = this.dashboardData[0]["result"][0]["quotelist"];
      console.log(this.dashboardData);
      loading.dismiss();
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
      loading.dismiss();
    });
  }

  // Call Button Event
  callToAdmin() {
    this.dashboardProvider.callToAdmin();
  }

    // Load Create Quote Page
  createQuoteFn(ev){
      // this.navCtrl.push(CreatequotePage,{
      //   quoteid:ev
      // });

      let dt1: NavigationExtras = {
        queryParams: {
          quoteid: ev
        }
      };
      this.router.navigate(['/createquote'], dt1);
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
        pagename: "viewquote"
      }
    };
    this.router.navigate(['/paynow'], dt1);
  }

  // Redirect to Notes page
  moveToNotes(ev){
    // this.navCtrl.push(ViewnotesPage,{
    //   quoteid:ev   
    // });

    let dt1: NavigationExtras = {
      queryParams: {
        quoteid:ev
      }
    };
    this.router.navigate(['/viewnotes'], dt1);
  }

  async getsmsdata(quoteid, phone){
    //alert(quoteid +"|"+ phone);
    let loading = await this.loadingCtrl.create({
      message: "Sending SMS to "+phone+" - Please wait!",
      spinner: "circles"
    });
    loading.present();

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};
    dashboardPost.staff_id = data.id;
    dashboardPost.quoteid = quoteid;
    dashboardPost.staff_type = data.staff_type;

    await this.dashboardProvider.getQuoteSMS(dashboardPost, "getQuoteSMS").then(
      result => {
        this.getQuoteSMS = this.dashboardProvider.returnResponseByNativeHttp(result);
        this.getQuoteSMS = Array.of(this.getQuoteSMS);
        this.sms_message = this.getQuoteSMS[0]["result"][0]["smstext"];
        this.sms_number = phone; //this.getQuoteSMS[0]["result"][0]["smsnumber"];
        this.sms_success = this.getQuoteSMS[0]["result"][0]["successmsg"];
        this.sms_fail = this.getQuoteSMS[0]["result"][0]["failmsg"];
        this.smsnotes = this.getQuoteSMS[0]["result"][0]["smsnotes"];
        console.log(this.getQuoteSMS);


        loading.dismiss();
      },
      async err => {
        loading.dismiss();
        console.log(err);

        (await this.alertCtrl.create({
          header: "Server Error",
          subHeader: 'Sms not sent. Please try again.',
          buttons: [
            {
              text: 'Please try again',
              handler: () => console.log('Closed')
            }
          ]
        })).present();
      }
    );

    loading.dismiss();

    await this.sms.smsByDevice(phone, this.sms_message, this.sms_success, this.sms_fail)
    .then( async _ => {
      
      dashboardPost.smsnotes = this.smsnotes;
      dashboardPost.smsrespnumber = _;
      dashboardPost.smsnumber = this.sms_number;

      await this.dashboardProvider.sendQuoteSmsResponse(dashboardPost, "sendQuoteSmsResponse").then(
        result => {
          this.sendQuoteSmsResponse = this.dashboardProvider.returnResponseByNativeHttp(result);
          console.log(this.sendQuoteSmsResponse); 
          loading.dismiss()         
        },
        async err => {
          loading.dismiss()
          console.log(err);
          (await this.alertCtrl.create({
            header: "Sms to - ${quoteid}",
            subHeader: 'Sms not sent. Please try again.',
            buttons: [
              {
                text: 'Please try again',
                handler: () => console.log('Closed')
              }
            ]
          })).present();
        }        
      );
    })
    .catch(_ => {
      loading.dismiss();
    })

  }



  async sendQuoteEmail(quoteid){
    
    let loading = await this.loadingCtrl.create({
      message: "Sending Email, Please Wait...",
      spinner: "circles"
    });
    loading.present();

      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};
      dashboardPost.staff_id = data.id;
      dashboardPost.quoteid = quoteid;
      dashboardPost.staff_type = data.staff_type;

      if( dashboardPost.quoteid.length > 0 ){
        this.dashboardProvider.sendQuoteEmail(dashboardPost, "sendQuoteEmail").then(
          async result => {
            this.sendQuoteEmailData = this.dashboardProvider.returnResponseByNativeHttp(result);
            this.sendQuoteEmailData = Array.of(this.sendQuoteEmailData);  
            this.defaultDataMsg = this.sendQuoteEmailData[0]["result"][0]["msg"];
            
            const toast = await this.toastCtrl.create({
              message: this.defaultDataMsg,
              duration: 3000 
            }); 
            toast.present();
          },
          err => {
            console.log(err);
          }
        ); 
      }

      loading.dismiss();

    }


    // Sort Order
  filterQuoteData(ev){
    // console.log("Sorting Clicked : " + ev);
    // console.log("Sorting id" + this.filterquote);

    this.getViewQuote(this.viewquotetabs, '', '');
  }


  //#### FOR MAKING REQUEST TO SERACH JOB THROUGH JOBID
  async getItems(ev, serachStr) {
    
    setTimeout(() => {
      if( serachStr.length >= 3) {
        //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
        //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
        this.getViewQuote( ev, serachStr, '');
  
      }
     }, 500);

  }

  moveToTask() {
    //this.navCtrl.push(CleanertasksPage);
    this.router.navigate(['/cleanertasks']);
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
