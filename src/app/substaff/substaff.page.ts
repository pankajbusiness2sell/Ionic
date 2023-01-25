import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-substaff',
  templateUrl: './substaff.page.html',
  styleUrls: ['./substaff.page.scss'],
})
export class SubstaffPage implements OnInit {

  dashboardData: any = {};
  
  constructor(
    public loadingCtrl: LoadingController, 
    public dashboardProvider: DashboardProvider,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dashboardData = {};
    this.getSubStaffList();
  }

    //#### GET DEFAULT SUB STAFF LIST
    async getSubStaffList() {

      let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
      loading.present();
  
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};
  
      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF  
      dashboardPost.staff_type = data.staff_type;
  
      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;
  
      this.dashboardProvider.getSubStaffList(dashboardPost, 'subStaffList').then((result) => {
  
        this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result); // JSON.parse(JSON.stringify(result));
        console.log(this.dashboardData);
        loading.dismiss();
      }, (err) => {
        this.dashboardData = JSON.parse(JSON.stringify(err));
        console.log(this.dashboardData);
        loading.dismiss();
      });
  
    }
  
    //#### GOTO EDIT SUB STAFF
    editSubstaff( subStaff: number ) {
      console.log('Edit Staff was pressed');
      this.gotoAddNewSubStaff(2 , subStaff);
    }
  
    //#### GOTO NEW SUB STAFF PAGE
    gotoAddNewSubStaff(type: number, subStaff?: any) {
  
      if( type === 1 ) {
        // this.navCtrl.push(AddsubstaffPage, {
        //   title: 'Add SubStaff',
        //   actionName: 'Add'
        // });
        
        let dt1: NavigationExtras = {
          queryParams: {
            title: 'Add SubStaff',
            actionName: 'Add'
          }
        };
        this.router.navigate(['/addsubstaff'], dt1);

      } else {
        // this.navCtrl.push(AddsubstaffPage, {
        //   title: 'Edit SubStaff',
        //   actionName: 'Update',
        //   subStaff: JSON.stringify(subStaff)
        // });

        let dt1: NavigationExtras = {
          queryParams: {
            title: 'Edit SubStaff',
            actionName: 'Update',
            subStaff: JSON.stringify(subStaff)
          }
        };
        this.router.navigate(['/addsubstaff'], dt1);

      }
  
    }

}
