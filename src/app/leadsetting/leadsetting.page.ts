import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';

@Component({
  selector: 'app-leadsetting',
  templateUrl: './leadsetting.page.html',
  styleUrls: ['./leadsetting.page.scss'],
})
export class LeadsettingPage implements OnInit {

  maxleadcnt:string;
  typeoflead:string;
  leadradius:string;
  leaddays:string;
  noofjobsaday:string;
  response: string;
  responseVal: number;
  title: string;
  actionName: string;
  dashboardData: any = {};
  leadDetails: any;
  defaultData: any;
  responseArr:any;

  constructor(
    public dashboardProvider: DashboardProvider,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    //#### FETCH LEADS FROM SERVER
    this.getLeadData();
  }

  //#### GET NEW JOBS DATA
  getLeadData() {
    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;
    this.dashboardProvider.getLeadData(dashboardPost, "getLeadData").then(
      result => {
        this.leadDetails = this.dashboardProvider.returnResponseByNativeHttp(result);
        this.leadDetails = Array.of(this.leadDetails);
        this.defaultData = this.leadDetails[0]["result"][0]["lead_data"];
        this.maxleadcnt = this.defaultData.maxleadcnt;
        this.typeoflead = this.defaultData.typeoflead;
        this.leadradius = this.defaultData.leadradius;
        this.leaddays = this.defaultData.leaddays;
        this.noofjobsaday = this.defaultData.noofjobsaday;

        //#### SET DEFAULT VALUES WHEN OPNE THE PAGE
        this.defaultInfo(this.defaultData);
      },
      err => {
        console.log(err);
      }
    );

  }

    //#### INVOKE DEFAULT TO SET WHEN PAGE OPENS
    defaultInfo(defaultData) {
      // console.log(this.defaultData[0].leadradius);
  
      this.maxleadcnt = this.defaultData[0].maxleadcnt;
      this.typeoflead = this.defaultData[0].typeoflead;
      this.leadradius = this.defaultData[0].leadradius;
      this.leaddays = this.defaultData[0].leaddays.split(",");
      this.noofjobsaday = this.defaultData[0].noofjobsaday;
    }

  //#### SAVE New Lead Setting
  async saveLeadSetting(maxleadcnt, typeoflead, leadradius, leaddays, noofjobsaday) {

    //#### LOADER PRESENTER
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

    //#### THIS IS Maximum Leads Per Day
    dashboardPost.maxleadcnt = maxleadcnt;

    //#### THIS IS Type of Leads
    dashboardPost.typeoflead = typeoflead;

    //#### THIS IS Leads Radius
    dashboardPost.leadradius = leadradius;

    //#### THIS IS Lead Days
    dashboardPost.leaddays = leaddays;

    //#### THIS IS Number of Jobs a Day
    dashboardPost.noofjobsaday = noofjobsaday;

    //#### ADD SUB STAFF IF IF EDIT MODE IS OPEN
    //this.addNewKeyForEditleadSetting( dashboardPost );

    console.log(dashboardPost);

    //#### SET ACTION TO ADD | EDIT SUB STAFF
    let actionPerform = 'addLeadSetting';
    // if( this.defaultData !== undefined ) {
    //   actionPerform = 'editLeadSetting';
    // } else {
    //   actionPerform = 'addLeadSetting';
    // }

    //console.log(dashboardPost);

    //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
    this.dashboardProvider.addLeadSetting( dashboardPost , actionPerform )
    .then((result) => {
      this.responseArr = this.dashboardProvider.returnResponseByNativeHttp(result);
      this.responseArr = Array.of(this.responseArr);
      this.response = this.responseArr[0]["result"][0]["msg"];;
      this.responseVal = this.responseArr[0]["status"];
    }, (err) => {
      let response = JSON.parse(JSON.stringify(err));
      this.response = response.result[0].msg;
      this.responseVal = response.status;
    });

    loading.dismiss();

  }

}
