import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { DashboardProvider } from 'src/app/services/dashboard/dashboard';

@Component({
  selector: 'app-cleaningpopup',
  templateUrl: './cleaningpopup.page.html',
  styleUrls: ['./cleaningpopup.page.scss'],
})
export class CleaningpopupPage implements OnInit {

  qdid: number = 0;
  jobtype: number = 0;
  jobLabel: string = '';
  bed: string;
  bath: string;
  study: string;
  toilet: string;
  living: string;
  furnished: string;
  stairs:string;  
  housetype: string;
  blinds: string;
  typedesc: string;
  typeamount: string;
  jobFormData = [];
  getQuoteAmount:any;
  getCalcAmnt:any;
  toManual: boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public dashboardProvider: DashboardProvider,
    public alertCtrl: AlertController,
    private navParams: NavParams,
    //private popoverCtrl: PopoverController,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    // console.log('ionViewDidLoad CleaningpopupPage');
    //console.log(this.viewCtrl.data)
    this.jobtype = this.navParams.data.jobtype;
    //this.jobLabel = this.viewCtrl.data.jobtypetitle; //(this.viewCtrl.data.jobtype == 1) ? 'Cleaning' : 'Carpet';
    if(this.navParams.data.jobtype == 1){
      this.jobLabel = "Cleaning";
    }else if(this.navParams.data.jobtype == 2){
      this.jobLabel = "Carpet";
    }else{
      this.jobLabel = "Other";
    }
    console.log(this.navParams.data.jobFormData[0]);
    if(this.navParams.data.jobFormData[0]){
      this.assignPopupValues(this.navParams.data);
    } 
    
  } 

  assignPopupValues(navParamsData) {
    if( navParamsData && navParamsData.jobFormData ) {
      // console.log(navParamsData.jobFormData[0]['blinds']);
      this.qdid = Number(navParamsData.jobFormData[0]['qdid']); 
      this.bed = navParamsData.jobFormData[0]['bed'];
      this.bath = navParamsData.jobFormData[0]['bath'];
      this.study = navParamsData.jobFormData[0]['study'];
      this.toilet = navParamsData.jobFormData[0]['toilet'];
      this.living = navParamsData.jobFormData[0]['living'];
      this.furnished = navParamsData.jobFormData[0]['furnished'];
      this.stairs = navParamsData.jobFormData[0]['stairs'];
      this.housetype = navParamsData.jobFormData[0]['housetype'];
      this.blinds = navParamsData.jobFormData[0]['blinds'];
      this.typedesc = navParamsData.jobFormData[0]['typedesc'];
      this.typeamount = navParamsData.jobFormData[0]['typeamount'];

    }
  }

  onDismissPopover() {
    this.modalController.dismiss();
  }

  savepopup(){
    const dashboardPost: any = {};
    dashboardPost.qdid = this.qdid;
    dashboardPost.jobtype = this.navParams.data.jobtype; 
    dashboardPost.bed = this.bed;
    dashboardPost.bath = this.bath;
    dashboardPost.study = this.study;
    dashboardPost.toilet = this.toilet;
    dashboardPost.living = this.living;
    dashboardPost.furnished = this.furnished;
    dashboardPost.stairs = this.stairs;
    dashboardPost.housetype = this.housetype;
    dashboardPost.blinds = this.blinds;
    dashboardPost.typedesc = this.typedesc;
    dashboardPost.typeamount = this.typeamount;
    dashboardPost.jobtypetitle = this.jobLabel;

    if(dashboardPost.jobtype == "1")
    {
      //dashboardPost.jobtypetitle = "Cleaning";
      dashboardPost.desc = this.bed + " Bed, " + this.bath +" Bath, "+ this.study + " Study, " + this.toilet + " Toilet, " + this.living + " Living, Furnished : " + this.furnished + ", House Type : " + this.housetype + ", Blinds : " +  this.blinds;
    } 
    else if(dashboardPost.jobtype == "2")
    {
      //dashboardPost.jobtypetitle = "Carpet";
      dashboardPost.desc = this.bed + " Bed, " + this.living + " Living & Dinning Area, " + this.stairs + " Stairs";
    }
    else if(dashboardPost.jobtype == "99")
    {
     // dashboardPost.jobtypetitle = "Others";
      dashboardPost.desc = this.typedesc;
    }
    
    this.modalController.dismiss(JSON.stringify(dashboardPost));

  }

  async askToSaveOrClose() {

    (await this.alertCtrl.create({
      header: 'Price Update',
      subHeader: 'Do you want to save the price ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.onDismissPopover();
          }
        },
        {
          text: 'Save Price',
          handler: () => {
            this.savepopup();
          }
        }
        
      ]
    })).present();

  }

  
  async calcAmount(jobtype,bed,bath,study,toilet,living,furnished,housetype,blinds,stairs){
    let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
    loading.present();

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;
    dashboardPost.jobtype = jobtype;
    dashboardPost.bed = bed;
    dashboardPost.bath = bath;
    dashboardPost.study = study;
    dashboardPost.toilet = toilet;
    dashboardPost.living = living;
    dashboardPost.stairs = stairs;
    dashboardPost.furnished = furnished;
    dashboardPost.housetype = housetype;
    dashboardPost.blinds = blinds;

    this.dashboardProvider.getQuoteAmount(dashboardPost, "getQuoteAmount").then(
      result => {
        this.getQuoteAmount = this.dashboardProvider.returnResponseByNativeHttp(result);
        this.getQuoteAmount = Array.of(this.getQuoteAmount);
        this.typeamount = this.getCalcAmnt = this.getQuoteAmount[0]["result"][0]["amt"];
        //console.log(this.getQuoteAmount);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  } 

  changeStatus = (status) => {
    if(status === true) {
      // #### SWITCH TO AUTO TO MANUAL
      this.toManual = status;
    }
  }

}
