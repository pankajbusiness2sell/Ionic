import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavParams } from '@ionic/angular';
import { DashboardProvider } from 'src/app/services/dashboard/dashboard';

@Component({
  selector: 'app-recleancheckpopup',
  templateUrl: './recleancheckpopup.page.html',
  styleUrls: ['./recleancheckpopup.page.scss'],
})
export class RecleancheckpopupPage implements OnInit {

  popoverData:any = {};
  reCleanDetails:any = {};
  dashboardData:any ={};
  timeData:any = [];
  arrangewith: any=[];
  recleanalldata:any=[];
  subStaffList:any = [];

  recleandate:string;
  jobtime:string;
  arrangewithTime:string;

  constructor(
    private navParams: NavParams,
    public loadingCtrl?: LoadingController,
    public toastCtrl?:ToastController,
    public dashboardProvider?: DashboardProvider,
  ) { }

  ngOnInit() {
    //console.log('ionViewDidLoad RecleanCheckPage');   
    this.reCleanDetails = this.navParams.data.reCleanData;
    console.log("----------reCleanDetails-----------");
    console.log(this.reCleanDetails);
    console.log("-----------reCleanDetails----------");
    this.recleandate = this.reCleanDetails['reclean_date'];
    this.jobtime = this.reCleanDetails['reclean_time'];
    this.arrangewithTime = this.reCleanDetails['arrange_with'];
    this.subStaffList = this.reCleanDetails['sub_staff_list']; 
    this.showTime();
    this.arrangeWith();
  }

  async arrangeWith(){
    const dashboardPost: any = {};
    // let loading = await this.loadingCtrl.create({
    //   message: "Please Wait",
    //   spinner: "circles"
    // });   
    // loading.present();
   
    this.dashboardProvider
      .getNewJobByRequest(dashboardPost, "TimeArrangeWith")      
      .then(                
        result => {         
          console.log(result);
           this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));           
           console.log(this.dashboardData);
           this.arrangewith = this.dashboardData['result'];
           //loading.dismiss();   
          console.log(this.arrangewith);
        },                    
        err => {
          console.log(err);   
           this.dashboardData = JSON.parse(JSON.stringify(err));
           //loading.dismiss();
        }
      );
  }

  async showTime(){      
    const dashboardPost: any = {};
    let loading = await this.loadingCtrl.create({
      message: "Please Wait",
      spinner: "circles"
    });   
    loading.present();
   
    this.dashboardProvider
      .getNewJobByRequest(dashboardPost, "getTimeDD")      
      .then(                
        result => {           
           this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));           
           this.timeData = this.dashboardData['result'];
           console.log(this.timeData);
           loading.dismiss();      
        },                    
        err => {   
          console.log(err);
           this.dashboardData = JSON.parse(JSON.stringify(err));
           loading.dismiss();
        }
      );
  }

  async savereCleandateTime(recleandata){         
    const dashboardPost: any = {};
    let loading = await this.loadingCtrl.create({
      message: "Please Wait",
      spinner: "circles"
    });   
    loading.present();

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    //const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    
     // const dashboardPost: any = {};   
      dashboardPost.recleandate = this.recleandate;
      dashboardPost.jobtime = this.jobtime;
      dashboardPost.arrangewithTime = this.arrangewithTime;
      dashboardPost.job_id = recleandata.jobID;
      //dashboardPost.recleandata = this.recleandata;

      console.log(dashboardPost);
      //return false;
      this.dashboardProvider
      .getNewJobByRequest(dashboardPost, "CheckedReCleanDateTime")      
      .then(                
        result => {           
           this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));           
           this.recleanalldata = this.dashboardData['result'];
           console.log(this.dashboardData);
           loading.dismiss();   
           //this.viewCtrl.dismiss(JSON.stringify(result)); 
           
        },                    
        err => {   
          console.log(err);
           this.dashboardData = JSON.parse(JSON.stringify(err));
           loading.dismiss();
           //this.viewCtrl.dismiss(null);
        }
      );
  }

}
