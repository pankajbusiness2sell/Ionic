import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
//import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  //@ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };
  public signatureImage : string;

  jobDetailData : any;
  jobData: any;
  
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public dashboardProvider: DashboardProvider
  ) { }

  ngOnInit() {
    this.jobDetailData = ""; //JSON.parse(this.navParams.get('activeJobDetail'));
    this.jobData = this.jobDetailData.result[0].data.all_active_jobs[0];
    console.log(this.jobData);
  }

  drawCancel2() {
    // this.navCtrl.push(DetailPage, {
    //   activeJobDetail: this.navParams.get('activeJobDetail'),
    //   page: 'signature'
    // });
  }

  drawCancel(jobDetail?: any) {
    if(jobDetail) {
      let data = { 'activeJobDetail': jobDetail };
      //this.viewCtrl.dismiss(data);
    } else {
      let data = { 'activeJobDetail': jobDetail };
      //this.viewCtrl.dismiss(data);
    }
  }

   drawComplete() {
    //  if( !this.signaturePad.isEmpty() ) {
    //     this.signatureImage = this.signaturePad.toDataURL();
    //     console.log(this.signatureImage);
    //     this.removalPayment();
    //  } else {
    //    console.log('Signature pad is blank');
    //  }
  }

  drawClear() {
    //this.signaturePad.clear();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    // this.signaturePad.set('minWidth', 1);
    // this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    // this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  ngAfterViewInit() {
        //this.signaturePad.clear();
        this.canvasResize();
  }

  //#### GET NEW JOBS DATA
  async removalPayment() {

    let loading = await this.loadingCtrl.create({
      message: 'Please wait',
      spinner: 'circles'
    });
    loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    // #### JOB ID
    dashboardPost.job_id = this.jobData.jobID;

    // #### SIGNATURE BASE64
    dashboardPost.signature = this.signatureImage;

    // #### RESTAMOUNT KEY
    dashboardPost.restamount = this.jobData.calculateRemovalData[0].restamount;

    // #### COMPLETE DATA
    dashboardPost.complete_data = JSON.stringify(this.jobData);

    console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.removalPayment( dashboardPost , 'removalPayment' )
    .then(async (result) => {
      // this.alertCtrl.create({
      //   title: Array.of(result)[0]["result"][0]["msg"],
      //   buttons: ['Ok']
      // })
      // .present();

      console.log(result);
      console.log(this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0].message);
      console.log(this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0].msg);

      loading.dismiss();
      if(this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0].message !== 'Success') {
        (await this.alertCtrl.create({
          header: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0].msg,
          buttons: ['Ok']
        }))
        .present();
      } else {
        (await this.alertCtrl.create({
          header: this.dashboardProvider.returnResponseByNativeHttp(result)["result"][0].msg,
          buttons: ['Ok']
        }))
        .present();
        //console.log(Array.of(result)[0]["result"][0].data.all_active_jobs);
        this.drawCancel(result);
      }
    }, (err) => {
      console.log(err);
      loading.dismiss();
    });

  }

}
