import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
//import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ActivatedRoute } from '@angular/router';
import { SafePipe } from '../pipes/safe/safe';

@Component({
  selector: 'app-termandcondition',
  templateUrl: './termandcondition.page.html',
  styleUrls: ['./termandcondition.page.scss'],
})
export class TermandconditionPage implements OnInit {

  public tnc: string;
//  @ViewChild(Content) content: Content;
  isActive: boolean;
  isActiveBottom: boolean;

  constructor(
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public dashboardProvider: DashboardProvider,
    public SafePipe: SafePipe
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.userDashboardData) {
        this.tnc = JSON.parse(params.termandconditionText.result[0].data.tnc);
      }
    });
  }

  ngOnInit() {
    this.isActive = true;
    this.isActiveBottom = false;

    //let dboard = ""; //this.viewCtrl.data.termandconditionText.result[0].data.tnc;
    //this.tnc = dboard;
  }
  async agreeTc() { 
    
    let loading = await this.loadingCtrl.create({message: 'Please Wait', spinner: 'circles'});
    loading.present();

    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));    
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    this.dashboardProvider.agreeTc(dashboardPost, 'agreeTc').then((result) => {
      console.log(Array.of(result));
      //this.viewCtrl.dismiss(result);
      loading.dismiss();
    }, (err) => {
      console.log(err);
      //this.viewCtrl.dismiss(null);
      loading.dismiss();
    });

  }

  ScrollToBottom(){    

    console.log('invoked');
    var element = document.getElementById("myLabel");
    // I can't remember why I added a short timeout,
    // but you might be able to use ngzone instead.
    // the below works great though.

    element.scrollIntoView({behavior: "smooth"});       
      this.isActive = false; 
      this.isActiveBottom = true;
    setTimeout(()=>{
      
    },500);
     
  }

  ScrollToTop(){

    var element = document.getElementById("myLabel2");
    // I can't remember why I added a short timeout,
    // but you might be able to use ngzone instead.
    // the below works great though.

    element.scrollIntoView({behavior: "smooth"});       
      this.isActiveBottom = false;
      this.isActive = true;
    setTimeout(()=>{
       
    },500);

  }
}
