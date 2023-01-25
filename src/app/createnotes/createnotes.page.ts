import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardProvider } from '../services/dashboard/dashboard';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.page.html',
  styleUrls: ['./createnotes.page.scss'],
})
export class CreatenotesPage implements OnInit {

  quoteid: number = 0;
  leadid: number = 0;
  qnotes: string;
  response: string;
  heading: string = "Personal Note";
  responseVal: number;
  statusMessage: string;
  dashboardData: any = {};
  responseArr: any;

  constructor(
    private route: ActivatedRoute,
    public dashboardProvider: DashboardProvider,
  ) { 
    // this.quoteid = navParams.get('quoteid');
    // this.leadid = navParams.get('leadid');
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.quoteid = params.quoteid;
        this.leadid = params.leadid;
      }
    });
  }

  ngOnInit() {

  }

  // Post Form Data
  saveNotes(){
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    // Data Found from logged in staff
    dashboardPost.staff_type = data.staff_type; //Sub Staff or Main Staff
    dashboardPost.staff_id = data.id;
    dashboardPost.quoteid = this.quoteid;
    dashboardPost.leadid = this.leadid;
    dashboardPost.qnotes = this.qnotes;
    dashboardPost.heading = this.heading;

    this.dashboardProvider.saveNotesSubmit(dashboardPost,'saveNotesSubmit')
    .then(
      (result) => {
        //let response = JSON.parse(JSON.stringify(result));
        this.responseArr = this.dashboardProvider.returnResponseByNativeHttp(result);
        this.responseArr = Array.of(this.responseArr);
        this.response = this.responseArr[0]["result"][0]["msg"];;
        this.responseVal = this.responseArr[0]["status"];
        this.statusMessage = this.responseArr[0]["message"];
        console.log("Response: " + this.response);
        if(this.statusMessage == "Success"){
          this.resetValues();
          setTimeout(() => {
            this.moveToNotes(this.quoteid);
          }, 1000);  //1s      
        }
      },
      (err) => {
        let response = JSON.parse(JSON.stringify(err));
        if( response.error.status === 400 ) {
          this.response = response.error.result[0].msg;
          this.responseVal = response.error.status;
        }
      } 
      )

  }

  resetValues(){
    this.qnotes = "";
    this.heading = "";
  }

  // Redirect to Notes page
  moveToNotes(ev){
    //this.navCtrl.pop();
  }

}
