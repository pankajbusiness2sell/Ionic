import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';

@Component({
  selector: 'app-viewnotes',
  templateUrl: './viewnotes.page.html',
  styleUrls: ['./viewnotes.page.scss'],
})
export class ViewnotesPage implements OnInit {

  quoteid: number = 0;
  leadid: number = 0;
  dashboardData: any;
  staff_type: any;
  defaultData: any;
  title: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public loadingCtrl: LoadingController, 
    public dashboardProvider?: DashboardProvider
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.quoteid = params.quoteid;
        this.leadid = params.leadid;
      }
    });
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.dashboardData = {};
    this.getNotes();
    this.setTitle();
  }

   //#### SET TITLE
   setTitle() {
    if( this.quoteid > 0 ){
      this.title = "View Notes Q#" + this.quoteid;
    } else if( this.leadid > 0 ) {
      this.title = "View Notes L#" + this.leadid;
    } else {
      this.title = "View Notes";
    }
  }

  addNotes(){
    // this.navCtrl.push(CreatenotesPage,{
    //   quoteid:this.quoteid,
    //   leadid:this.leadid
    // });

    let dt1: NavigationExtras = {
      queryParams: {
        quoteid: this.quoteid,
        leadid: this.leadid
      }
    };
    this.router.navigate(['/createnotes'], dt1);
  }

  async getNotes(){
    let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
    loading.present();

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    dashboardPost.staff_type = data.staff_type;
    this.staff_type = data.staff_type;

    dashboardPost.quoteid = this.quoteid;
    dashboardPost.leadid = this.leadid;

     //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
     this.dashboardProvider.getNotes( dashboardPost , 'getNotes' )
     .then((result) => {
       //this.dashboardData = JSON.parse(JSON.stringify(result));
       this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
       this.dashboardData = Array.of(this.dashboardData);
       this.defaultData = this.dashboardData[0]["result"][0]["notes"];
       console.log(this.defaultData);
       loading.dismiss();
     }, (err) => {
       console.log(err);
       this.dashboardData = JSON.parse(JSON.stringify(err));
       loading.dismiss();
     });


  }

}
