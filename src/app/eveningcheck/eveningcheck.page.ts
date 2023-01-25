import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController, NavParams } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';

@Component({
  selector: 'app-eveningcheck',
  templateUrl: './eveningcheck.page.html',
  styleUrls: ['./eveningcheck.page.scss'],
})
export class EveningcheckPage implements OnInit {

  extpime:string;   
  // timeData :any; // 0
   timeData:any[] = [];   
   //contacttimeType:any[] = [1,2];     
   pmCheckFirst: Number = 0;
   jobtimeChangeDate: any;
   jobTime:string;
   min:String; 
   chooseSelectTimeToContact: Number = 0;
   popoverData:any = {};
   jobData:any ={}
   dashboardData:any ={};
   staff_type_global: number;
   clientnumber: number;
   clientname:string;

  constructor(
    public loadingCtrl?: LoadingController,
    public dashboardProvider?: DashboardProvider, 
    public toastCtrl?: ToastController,
    //public viewCtrl?: ViewController
    private navParams?: NavParams,
  ) { }

  ngOnInit() {

    console.log('ngOnInit eveningcheck');

    this.jobData = this.navParams.data.jobData;
    console.log(this.jobData);
    //this.jobData = this.popoverData; 
    this.pmCheckFirst = this.jobData['next_day_admin_cehck'];    

    this.jobTime = this.jobData['job_time'];        
    this.jobtimeChangeDate = this.jobData['job_time_change_date'];        
    this.clientnumber = this.jobData['clientDetail']['phone'];
    this.clientname = this.jobData['clientDetail']['name'];

    this.showTime();
  }

  async updateContactToCustomer(jobTime, jobdate) {
    //console.log(jobTime, jobdate);
    //this.openInfoByType(jobTime, jobdate,1);   

    let loading = await this.loadingCtrl.create({
      message: "Please Wait",
      spinner: "circles"
    });
    loading.present();

 //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;
    this.staff_type_global = data.staff_type;

    //console.log(this.staff_type_global);

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;
    dashboardPost.job_id = jobdate.jobID;
    dashboardPost.contacttype = jobTime;
    dashboardPost.action = 1;
   // dashboardPost.contacttype = type;
      

    //console.log(type, this.pmCheckFirst);
   // alert(this.pmCheckFirst);
    console.log(dashboardPost);    
        
      this.dashboardProvider
      .getNewJobByRequest(dashboardPost, "CheckedContactTime")     
      .then(      
        result => {  
           this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
           
     
           this.pmCheckFirst = this.dashboardData.result[0]['msg'].contacttype;
           this.jobTime = this.dashboardData.result[0]['msg'].job_time;
           this.jobtimeChangeDate = this.dashboardData.result[0]['msg'].job_time_change_date;  

           console.log(this.dashboardData.result[0]['msg']);    
           
          //  this.navCtrl.push(ActivejobsPage, {
          //   'activeJobs': JSON.stringify(result)
          // });
      
          loading.dismiss();    
        },       
        err => {
          console.log(err);
           this.dashboardData = JSON.parse(JSON.stringify(err));
           loading.dismiss();
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
           console.log(this.dashboardData);
           this.timeData = this.dashboardData.result;  

          //  this.navCtrl.push(ActivejobsPage, {
          //   'activeJobs': JSON.stringify(result)
          // });
              
           loading.dismiss();    

          
        
        },       
        err => {
          console.log(err);
           this.dashboardData = JSON.parse(JSON.stringify(err));
           loading.dismiss();
        }
      );

       
  }

  async openInfoByType(type, jobdate) {       
 
  //console.log(type);  
    let loading = await this.loadingCtrl.create({
      message: "Please Wait",
      spinner: "circles"
    });
    loading.present();

 //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem("afterLoginData"));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;
    this.staff_type_global = data.staff_type;

    //console.log(this.staff_type_global);

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;
    dashboardPost.job_id = jobdate.jobID;
    dashboardPost.contacttype = type;
    dashboardPost.action = 0;
   // dashboardPost.contacttype = type;
      

    //console.log(type, this.pmCheckFirst);
   // alert(this.pmCheckFirst);
    console.log(dashboardPost);    
        
      this.dashboardProvider
      .getNewJobByRequest(dashboardPost, "CheckedContactTime")     
      .then(      
        result => {  
           this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
           loading.dismiss();    
     
           this.pmCheckFirst = this.dashboardData.result[0]['msg'].contacttype;
           this.jobTime = this.dashboardData.result[0]['msg'].job_time;
           this.jobtimeChangeDate = this.dashboardData.result[0]['msg'].job_time_change_date;  

           console.log(this.pmCheckFirst, this.jobtimeChangeDate);        
      
        },       
        err => {
          console.log(err);
           this.dashboardData = JSON.parse(JSON.stringify(err));
           loading.dismiss();
        }
      );

  }

  saveChoosTime(chooseSelectTimeToContact) {
    console.log(chooseSelectTimeToContact);
  }

}
