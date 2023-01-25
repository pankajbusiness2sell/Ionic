import { Component, OnInit } from '@angular/core';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addsubstaff',
  templateUrl: './addsubstaff.page.html',
  styleUrls: ['./addsubstaff.page.scss'],
})
export class AddsubstaffPage implements OnInit {

  fname: string;
  email: string;
  phone: string;
  password: string;
  response: string;
  responseVal: number;
  title: string;
  actionName: string;
  dashboardData: any = {};
  subStaff: any = "";

  constructor(
    public dashboardProvider: DashboardProvider,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute, 
    private router: Router,
    //public viewCtrl: ViewController
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.title = params.title;
        this.actionName = params.actionName;
        if(params.subStaff){
          this.subStaff = JSON.parse(params.subStaff);
        }
      }
    });
   }

  ngOnInit() {
    //console.log(this.viewCtrl.data);
    //#### FLUSH HE VALU INITIALLY
    this.flushDefault();

    //#### SET TITLE
    this.setTitle();

    //#### FILL EDIT FORM
    this.fillEditForm();
  }

    //#### SET FORM DATA IF EDIT
    fillEditForm() {
      if( this.subStaff !== undefined || this.subStaff !== "" ) {
        //#### FILL THE VALUES INTOT THE FORM
        let fillData = this.subStaff;  //JSON.parse(this.viewCtrl.data.subStaff);
        console.log(fillData);
        //#### SET THE FORM VALUE
        this.setFormValues( fillData );
  
      }
    }
    
    //#### SET TITLE
    setTitle() {
      // this.title = this.navParams.get('title');
      // this.actionName = this.navParams.get('actionName');
    }
  
    //#### SETTING ALL VALUES INTO FORM FEILDS
    setFormValues( formFeilds ) {
      this.fname = formFeilds.name;
      this.email = formFeilds.email;
      this.phone = formFeilds.mobile;
      this.password =  formFeilds.password;
    }
  
    //#### ADD NEW KEY INTO POST DATA THROUGH SERVICE BACKEND
    addNewKeyForEditSubStaff( dashboardPost: any ) {
  
      if( this.subStaff !== undefined || this.subStaff !== "" ) {
  
        let fillData = this.subStaff; 
        dashboardPost.sub_staff_id = fillData.id;
  
      }
  
    }
  
    //#### FLUSH DEFAULT VARIABLES
    flushDefault() {
      this.fname = '';
      this.email = '';
      this.phone = '';
      this.password = '';
      this.response = '';
      this.responseVal = 0;
    }
  
    //#### SAVE NEW SUB STAFF
    async saveNewStaff() {
  
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
  
      //#### THIS IS FIRST NAME
      dashboardPost.fname = this.fname;
  
      //#### THIS IS EMAIL
      dashboardPost.email = this.email;
  
      //#### THIS IS PHONE
      dashboardPost.phone = this.phone;
  
      //#### THIS IS PASSWORD
      dashboardPost.password = this.password;
  
      //#### ADD SUB STAFF IF IF EDIT MODE IS OPEN
      this.addNewKeyForEditSubStaff( dashboardPost );
  
      console.log(dashboardPost);
  
      //#### SET ACTION TO ADD | EDIT SUB STAFF
      let actionPerform = 'addSubStaff';
      console.log(this.subStaff);
      if( this.subStaff !== undefined && this.subStaff !== "" ) {
        actionPerform = 'editSubStaff';
      } else {
        actionPerform = 'addSubStaff';
      }

      console.log(actionPerform);
  
      //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
      this.dashboardProvider.addSubStaff( dashboardPost , actionPerform )
      .then((result) => {
        console.log(result);
        let response = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
        if( response.status === 200 ) {
  
          //#### LOADER FLUSH
          loading.dismiss();
  
          this.response = response.result[0].msg;
          this.responseVal = response.status;
  
          if( actionPerform == 'addSubStaff' ) {
            //#### FLUSH FORM DATA
            this.fname = '';
            this.email = '';
            this.phone = '';
            this.password = '';
          }
          console.log(response.result[0]);
  
        }
      }, (err) => {
        console.log(err);
        let response = JSON.parse(JSON.stringify(err));
        console.log(response.error.status);
        console.log(response.error);
  
        if( response.error.status === 400 ) {
  
          //#### LOADER FLUSH
          loading.dismiss();
  
          this.response = response.error.result[0].msg;
          this.responseVal = response.error.status;
        }
      });
  
    }

}
