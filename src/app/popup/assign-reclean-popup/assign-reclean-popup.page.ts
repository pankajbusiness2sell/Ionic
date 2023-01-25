import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-assign-reclean-popup',
  templateUrl: './assign-reclean-popup.page.html',
  styleUrls: ['./assign-reclean-popup.page.scss'],
})
export class AssignRecleanPopupPage implements OnInit {

  popoverData:any = {};
  jobData: any;
  jobtypes: any;
  selectedJobTypes = [];

  constructor(
    private navParams: NavParams,
    public modalController: ModalController,
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
    this.popoverData = this.navParams.data.jobDetail;
    this.jobData = this.popoverData;
    this.jobtypes = this.jobData.jobtypes;
    console.log(this.jobData);
  }

  assignReclean(){
    //console.log();
  }

  checkEvent(ev) {
    console.log(ev);

    if( ev.isChecked === true ){
      this.selectedJobTypes.push(ev.job_type_id);
    }

    if( ev.isChecked === false ){
      this.selectedJobTypes = this.arrayRemove(this.selectedJobTypes, ev.job_type_id);
    }

    console.log(this.selectedJobTypes);
  }

  arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
  }

  //#### FORCELY DISMISS POPOVER
  async onDismissPopover() {
    await this.popoverCtrl.dismiss(this.selectedJobTypes);
  }



}
