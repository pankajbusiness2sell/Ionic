import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { ExternalProvider } from '../services/external/external';
import {urlLoader} from './../url_loader';

declare const eCrypt: any;

@Component({
  selector: 'app-paynow',
  templateUrl: './paynow.page.html',
  styleUrls: ['./paynow.page.scss'],
})
export class PaynowPage implements OnInit {

  timeData:any[] = [];
  quoteid: number = 0;
  nameoncard: string;
  cardnumber: any;
  expirymonth: number = 0;
  expiryyear: number = 0;
  cvv: any;
  //invoicenumber: any;
  response: any;
  responseVal: any;
  payAmt: Number = 50;
  payValueHeading: Number;
  extraAmount: Number = 0;
  payableAmount: Number = 0.00;
  checkboxdata:any;
  pagename:any;
  isChecked:any;
  dashboardData: any;

  apiName:any = "bbcJobPayment";

  api_jobid: any;
  api_site_id: any;
  api_booking_date: any;
  api_totalamount: any;
  api_minamt: any;
  api_paidamount: any;
  api_restamt: any;
  api_eway_token: any;
  api_typepayment: any;
  api_show_payment: any = true;
  api_chargeagree: any;
  api_ischecked: any = false;
  api_show_payment_msg: any;

  api_eway_token_old: any = 0;
  pay_using_old_card: boolean = false;
  pay_using_new_card: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public dashboardProvider: DashboardProvider,
    public external: ExternalProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.quoteid = params.quoteid;
        this.payableAmount = params.payableAmount;
        this.pagename = params.pagename;
      }
    });
   }

  ngOnInit() {
    this.setTheFileOnLocation();
    console.log('ionViewDidLoad PaynowPage');
    this.getPaymentInfo();
    this.showContactTime();
    // this.expiryyear = 2020;
    // this.expirymonth = 3;
    console.log(this.payAmt);
  }

  ionViewDidLoad() {

  }

  async getPaymentInfo(){
    
    let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
    loading.present();

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};
      dashboardPost.staff_id = data.id;
      dashboardPost.quoteid = this.quoteid;
      dashboardPost.staff_type = data.staff_type;
      console.log("Step 0");
      if( dashboardPost.quoteid.length > 0 ){
        this.dashboardProvider.makePaymentPage(dashboardPost, "makePaymentPage").then(
          result => {
            this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
            this.dashboardData = Array.of(this.dashboardData);  
            //console.log("Step 1");
            console.log(this.dashboardData);
            this.dashboardData = this.dashboardData[0]["result"][0]["qry"][0];
            this.api_jobid = this.dashboardData['jobid'];
            this.api_site_id = this.dashboardData['site_id'];
            this.api_booking_date = this.dashboardData['booking_date'];
            this.api_totalamount = this.dashboardData['totalamount'];
            this.api_minamt = this.dashboardData['minamt'];
            this.api_paidamount = this.dashboardData['paidamount'];
            this.api_restamt = this.dashboardData['restamt'];
            this.payValueHeading = this.dashboardData['restamt'];
            this.api_eway_token = this.dashboardData['eway_token'];
            this.api_typepayment = this.dashboardData['typepayment'];
            this.api_show_payment = this.dashboardData['show_payment'];
            this.api_chargeagree = this.dashboardData['chargeagree'];
            this.api_ischecked = this.dashboardData['ischecked'];
            this.api_show_payment_msg = this.dashboardData['show_payment_msg'];

            if( this.api_paidamount > 0 ){
              this.pay_using_new_card = true;
            }
          },
          err => {
            console.log(err);
          }
        ); 
      }
      loading.dismiss();
  }

  setTheFileOnLocation() {
    return new Promise<void>((resolve, reject) => {      
      this.external.loadScript(urlLoader.EWAY_ECRYPT_KEY);
      resolve();      
    })
  }

    // Best time to contact
  // Best time to contact
  showContactTime(){
    for(let i = 2021; i < 2050; i++){
      this.timeData.push(i);
    } 
  }

  getCheckboxdatalist(){
    
  }

  addNewCard(){
    this.api_eway_token_old = this.api_eway_token;
    this.api_eway_token = 0;
    this.pay_using_old_card = true;
    this.pay_using_new_card = false;
  }

  useOldCard(){
    //this.api_eway_token_old = this.api_eway_token;
    this.api_eway_token = this.api_eway_token_old;
    this.pay_using_old_card = false;
    this.pay_using_new_card = true;
  }

  updateRestAmt(){
    if( this.payAmt == 0 ){
      this.payValueHeading = this.extraAmount;
      console.log("A : " + this.payValueHeading);
    } else {
      this.payValueHeading = this.payAmt;
      console.log("B : " + this.payValueHeading);
    }
  }


  // #### PAY NOW BUT ENCRYPTED FIRST
  async payNow(quoteid) {

    let loading = await this.loadingCtrl.create({
      message: `Verifying, Please wait...` ,
      spinner: "circles"
    });
    loading.present();

    console.log(this.isChecked);
    
    // #### CHECK BEFORE GOING TO MAKE THE PAYMENT
    if(this.api_eway_token == 0 &&
      (this.nameoncard == undefined ||
      this.expirymonth == 0 ||
      this.expiryyear == 0 ||
      this.cardnumber == undefined ||
      this.cvv == undefined ||
      (this.payAmt == 0 && this.extraAmount == 0) ) 
    ) {
      loading.dismiss();
      (await this.alertCtrl.create({
        header: 'Credit Card Errors',
        subHeader: 'Please Fill All Mandatory Fields',
        buttons: [
          {
            text: 'Ok',
            handler: () => console.log('closed')
          }
        ]
      })).present()
      return false;
    }


    


    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    // Data Found from logged in staff
    dashboardPost.staff_type = data.staff_type; //Sub Staff or Main Staff
    dashboardPost.staff_id = data.id;

    if(quoteid > 0) 
    {
      dashboardPost.quoteid = quoteid;

      if( this.payAmt == 0 && this.extraAmount > 0 ){
        dashboardPost.payamt = this.extraAmount;
      } else {
        dashboardPost.payamt = (this.api_typepayment == 2) ? this.payAmt : this.api_restamt;
      }      

      if( this.api_eway_token != 0 && this.api_eway_token != '' ){
        dashboardPost.jobid = this.api_jobid;
        this.apiName = "paymentByToken";
        dashboardPost.payamt = this.api_restamt;
      } else {
        
        eCrypt.submitForm = true;
        const cardnumber = eCrypt.encryptValue(this.cardnumber);
        const cvv = eCrypt.encryptValue(this.cvv);

        dashboardPost.nameoncard = this.nameoncard;
        dashboardPost.expirymonth = this.expirymonth;
        dashboardPost.expiryyear = this.expiryyear;
        //dashboardPost.invoicenumber = this.invoicenumber;
        dashboardPost.cardnumber = cardnumber;
        dashboardPost.cvv = cvv;
        dashboardPost.isChecked = (this.isChecked == true) ? 1 : 0;
      }


      dashboardPost.eway_token = this.api_eway_token;
      console.log(dashboardPost);
      console.log(this.apiName);


      this.dashboardProvider.bbcJobPayment(dashboardPost,this.apiName).then(
      async (result) => {
        //let response = JSON.parse(JSON.stringify(result));
        
        let response = this.dashboardProvider.returnResponseByNativeHttp(result);
        console.log(response);
        if( response.status === 200 ) {
          loading.dismiss();
          this.response = response.result[0].msg;
          this.responseVal = response.status;
        }
        console.log(response);
        if( this.response.toLowerCase == 'payment failed' || this.response.toLowerCase == 'incorrect details') {
          (await this.alertCtrl.create({
            header: 'Payment Charge Failed',
            subHeader: `Your quote can not booked due to unsuccessful payment. Please try again.`,
            buttons: [
              {
                text: 'Please try again',
                handler: () => console.log('closed')
              }
            ]
          })).present()
        } else if(this.response.toLowerCase == 'payment success' || this.response == 'Payment Success') {
          (await this.alertCtrl.create({
            header: 'Payment Charge Successful',
            subHeader: `Your quote is being booked after your successful payment`,
            buttons: [
              {
                text: 'Done',
                handler: () => {
                  //this.navCtrl.pop()
                }
              }
            ]
          })).present()

        } else if(this.response == null) {
          (await this.alertCtrl.create({
            header: 'Credit Card Error',
            subHeader: `Please check your card details. Try again`,
            buttons: [
              {
                text: 'Please try again',
                handler: () => {
                  console.log('Closed');
                }
              }
            ]
          })).present()
          return false;
        } else {
          (await this.alertCtrl.create({
            header: this.response,
            subHeader: this.response,
            buttons: [
              {
                text: 'Please try again',
                handler: () => {
                  console.log('Closed');
                }
              }
            ]
          })).present()
          return false;
        }
      },
      async (err) => {
        // let response = JSON.parse(JSON.stringify(err));
        // if( response.error.status === 400 ) {
        //   this.response = response.error.result[0].msg;
        //   this.responseVal = response.error.status;
        // }
        console.log(this.response);

        loading.dismiss();
        
        (await this.alertCtrl.create({
          header: 'Server error',
          subHeader: 'An error occurred on server. Please wait for sometime and try again.',
          buttons: [
            {
              text: 'Please try again',
              handler: () => console.log('closed')
            }
          ]
        })).present()
      })
    }
    return false;
  }

}
