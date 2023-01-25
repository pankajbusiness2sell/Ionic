import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.page.html',
  styleUrls: ['./leads.page.scss'],
})
export class LeadsPage implements OnInit {

  dashboardData: any;
  defaultData: any;
  notificationCount: string;
  staff_type_global: any;
  leadstatus: any;
  leadstatusmsg: any;
  viewleadtabs: string;
  leadstatusid : string;
  newleads: number;
  calledleads: number;
  lostleads: number;

  lead_status_for_lost: any;
  selectOptions: { title: string; subTitle: string; mode: string; };

  constructor(
    private router:Router,
    public loadingCtrl: LoadingController,
    public dashboardProvider?: DashboardProvider,
  ) { 
    this.viewleadtabs = 'newleads';
    this.leadstatusid = '1'; 
  }

  ngOnInit() {
    this.getLeadStatus();
    this.getLeadList(this.viewleadtabs);
    this.selectOptions = {
      title: 'Change Lead Status',
      subTitle: '',
      mode: 'md'
    };
  }

  ionViewWillEnter(){
    this.dashboardData = {};
    this.notificationCount = '';
  }

  

  refreshPage() {    
    this.getLeadList(this.viewleadtabs);
    setTimeout(() => {
    console.log('Async operation has ended');
    }, 1000);
  }

  async getLeadList(ev) {
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

    if(ev == 'newleads'){
      dashboardPost.leadstatus = 1;
    } else if(ev == 'calledleads'){
      dashboardPost.leadstatus = 2;
    } else if(ev == 'lostleads'){
      dashboardPost.leadstatus = 3;
    } else {
      dashboardPost.leadstatus = 1;
    }

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    await this.dashboardProvider.getLeadList( dashboardPost , 'getLeadList' )
    .then((result) => {
      //this.dashboardData = JSON.parse(JSON.stringify(result));
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
      this.dashboardData = Array.of(this.dashboardData);
      this.defaultData = this.dashboardData[0]["result"][0]["quotelist"];
      this.leadstatusid = this.dashboardData[0]["result"][0]["leadstatus"];
      console.log(this.defaultData);
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
    });

    this.getAllLeadsCount(); //to get count of all types of leads

    loading.dismiss();
    
  }

  async getAllLeadsCount(){
    //let loading = this.loadingCtrl.create({content: 'Please wait', spinner: 'ios'});
    //await loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;
    this.staff_type_global = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    await this.dashboardProvider.getLeadList( dashboardPost , 'leadsCountAccToType' )
    .then((result) => {
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
      this.dashboardData = Array.of(this.dashboardData);
      this.newleads = this.dashboardData[0]["result"][0]["newleads"];
      this.calledleads = this.dashboardData[0]["result"][0]["calledleads"];
      this.lostleads = this.dashboardData[0]["result"][0]["lostleads"];
    }, (err) => {
      console.log(err);
      this.dashboardData = JSON.parse(JSON.stringify(err));
    });

  }

  async callToCustomer(customerNumber, leadid) {
    console.log(customerNumber);

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};
    dashboardPost.staff_type = data.staff_type;
    dashboardPost.staff_id = data.id;
    dashboardPost.cxnum = customerNumber;
    dashboardPost.lead_id = leadid;

    await this.dashboardProvider.getLeadStatusDD( dashboardPost , 'callToCustomer' )
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

  // Redirect to Notes page
  moveToNotes(ev){
    // this.navCtrl.push(ViewnotesPage,{
    //   leadid:ev
    // });

    let dt1: NavigationExtras = {
      queryParams: {
        leadid: ev
      }
    };
    this.router.navigate(['/viewnotes'], dt1);
  }

   /*

    @PARAMS: ev1: number, ev2: number
    @return: void
    @data-set: set the response

  */
 async leadStatusChange(ev1, ev2){
  let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
  loading.present();
  let data = JSON.parse(localStorage.getItem('afterLoginData'));
  const dashboardPost: any = {};
  dashboardPost.staff_type = data.staff_type;
  dashboardPost.staff_id = data.id;
  dashboardPost.quoteid = ev2;
  dashboardPost.lead_status = ev1.detail.value;


  await this.dashboardProvider.leadStatusChange( dashboardPost , 'leadStatusChange' )
  .then(async (result) => {
    this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
    this.dashboardData = Array.of(this.dashboardData);
    this.leadstatusmsg = this.dashboardData[0]["result"][0]["msg"];
    console.log(this.leadstatusmsg);
    loading.dismiss();

    if( dashboardPost.lead_status == 4 || dashboardPost.lead_status == '4' ){
      let dt1: NavigationExtras = {
        queryParams: {
          quoteid: ev2
        }
      };
      this.router.navigate(['/createquote'], dt1);
    } else {
      await this.getLeadList(this.viewleadtabs);
    }

  }, (err) => {
    console.log(err);
    loading.dismiss();
    this.dashboardData = this.dashboardProvider.returnResponseByNativeHttpError(err); //JSON.parse(JSON.stringify(err));
  });

}

async getLeadStatus(){
  let data = JSON.parse(localStorage.getItem('afterLoginData'));
  const dashboardPost: any = {};
  dashboardPost.staff_type = data.staff_type;
  dashboardPost.staff_id = data.id;

  await this.dashboardProvider.getLeadStatusDD( dashboardPost , 'getLeadStatusDD' )
  .then((result) => {
    this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
    this.dashboardData = Array.of(this.dashboardData);
    this.leadstatus = this.dashboardData[0]["result"][0]["leadstatus"];
    console.log(this.leadstatus);
  }, (err) => {
    console.log(err);
    this.dashboardData = JSON.parse(JSON.stringify(err));
  });
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
