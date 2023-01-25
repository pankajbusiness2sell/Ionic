import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { CleaningpopupPage } from '../popup/cleaningpopup/cleaningpopup.page';
import { DashboardProvider } from '../services/dashboard/dashboard';
import {} from 'googlemaps';
import { ActivatedRoute } from '@angular/router';
//import { SmsProvider } from '../services/sms/sms';
declare var google: any;

@Component({
  selector: 'app-createquote',
  templateUrl: './createquote.page.html',
  styleUrls: ['./createquote.page.scss'],
})
export class CreatequotePage implements OnInit {

  timeData:any[] = [];
  groups = [];    
  shownGroup: any;
  statusText: string = '';
  jobdate: string;  
  jobtype: any = 0;
  postcode: string;
  suburb: string;
  bed: string;
  bath: string;
  study: string;
  toilet: string;
  living: string;
  furnished: string;
  stairs:string;
  housetype: string;
  blinds: string;
  typedesc: string;
  typeamount: number = 0;
  whitegoods: string;
  parking: string;
  petsproperty: string;
  amount: number = 0.00;
  cxname: string;
  cxemail: string;
  cxphone: string;
  cxcomment: string;
  cxaddress: string;
  cxbesttime: string;
  response: string;
  responseVal: number;
  dashboardData: any = {};
  defaultData: any;
  defaultData2: any;
  getCalcAmnt:any;
  getJobType: any;
  getPostCode: any;
  getQuoteAmount:any;
  quotetabs: string;
  amtobjects: string;
  quoteid:number;
  quoteDetails:any;
  defaultInfo:any;
  qdid:number;
  title:string;
  popupData = [];
  popupDataArr = [];
  popDataArrHtml: any = [];
  totalAmt: number = 0;
  isLead: boolean = false;
  submitBtnName: string;

  sms_number: string;
  sms_message: string;
  sms_success: string;
  sms_fail: string;
  getQuoteSMS: any[];
  getQuoteSMSText: any[];
  sendQuoteSmsResponse: any[];
  sendQuoteEmailData: any[];
  smsnotes: string;
  defaultDataMsg: string;

  showSMSEmailBtn: boolean = false;
  showCreateQuoteBtn: boolean = true;
  showSaveBtn: boolean = true;

  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;
  GoogleAutocomplete : any = new google.maps.places.AutocompleteService();
  autocomplete = { input: '' };
  autocompleteItems = [];
  responseArr: any;

  saveBtnStep:number = 2;

  getParkingList:any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public dashboardProvider: DashboardProvider,
    public popOverCtrl: PopoverController,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    //public sms: SmsProvider,
    public toastCtrl?: ToastController,
  ) { 
      this.quotetabs = 'quotedetailtab';
      
      //TODO: uncomment and update below script when editing quote 
      this.route.queryParams.subscribe(params => {
        if (params) {
          this.quoteid = params.quoteid;
          this.isLead = params.isLead;
        }
      });
  }

  ionViewDidLoad() {
    
  }
   
  ngOnInit() {
    //#### FETCH Quotes FROM SERVER
    console.log('ionViewDidLoad CreatequotePage');
    this.showContactTime();
    this.getJobTypeData();
    this.getParkingDropdownList();
    console.log(this.quoteid);
    console.log(this.isLead);
    if( this.quoteid > 0 ){
      this.getQuoteData();
    }
  }

  ionViewWillEnter(){   
    //#### SET TITLE
    this.setTitle();  
  }

  //#### SET TITLE
  setTitle() {
    if( this.quoteid > 0 ){
      if( this.isLead == true ){
        this.title = "Edit Lead";
        this.submitBtnName = "Create Quote";
      } else {
        this.title = "Edit Quote";
        this.submitBtnName = "Save Quote";
        this.showSMSEmailBtn = true;
      }
    } else {
      this.title = "Create Quote";
      this.submitBtnName = "Create Quote";
    }
  }

  getParkingDropdownList(){
    const dashboardPost: any = {};

    this.dashboardProvider.getParkingList(dashboardPost, "getParkingList").then(
      result => {
        this.getParkingList = this.dashboardProvider.returnResponseByNativeHttp(result);
        this.getParkingList = Array.of(this.getParkingList);
        this.getParkingList = this.getParkingList[0]["result"][0]["data"];
        console.log(this.getParkingList);
      },
      err => {
        console.log(err);
      }
    );
  }

  //Remove data from array
  deleteSelectedJob(index){
    this.popupDataArr.splice(index, 1);
  }

  // Best time to contact
  showContactTime(){
    for(let i = 7; i < 18; i++){
      this.timeData.push(i+':00-'+i+':30');
      this.timeData.push(i+':30-'+(i+1)+':00');
    } 
  }

    //#### GET NEW JOBS DATA
    getQuoteData() {
      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {}; 
  
      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;
      dashboardPost.quoteid = this.quoteid;

      this.dashboardProvider.getQuoteData(dashboardPost, "getQuoteData").then(
        result => {
          this.quoteDetails = this.dashboardProvider.returnResponseByNativeHttp(result);
          this.quoteDetails = Array.of(this.quoteDetails);
          this.defaultData = this.quoteDetails[0]["result"][0]["quote_data"][0];
          this.jobdate = this.defaultData.jobdate;
          this.jobtype = this.defaultData.jobtype;
          this.postcode = this.defaultData.postcode;
          
          
          console.log("suburb : " + this.suburb);
          this.popupDataArr = this.defaultData.popupDataArr;

          this.whitegoods = this.defaultData.whitegoods;
          this.parking = this.defaultData.parking;
          this.petsproperty = this.defaultData.petsproperty;
          this.amount = (this.defaultData.amount == null) ? 0.00 : this.defaultData.amount;
          this.cxname = this.defaultData.cxname;
          this.cxphone = this.defaultData.cxphone;
          this.cxemail = this.defaultData.cxemail;
          this.cxaddress = this.defaultData.cxaddress;
          this.cxcomment = this.defaultData.cxcomment;
          this.cxbesttime = this.defaultData.cxbesttime;
          this.qdid = Number(this.defaultData.qdid);
          this.suburb = this.defaultData.suburb;
          
          this.postcodelist({target: {value: this.postcode}});

          //#### SET DEFAULT VALUES WHEN OPNE THE PAGE
          this.defaultInfo = this.defaultData;
          console.log(this.defaultData);

          
        },
        err => {
          console.log(err);
        }
      );
  
    }

  // Post Form Data
  async saveQuote(saveBtnStep){

    this.saveBtnStep = saveBtnStep;

    if( this.amount == 0 || this.amount == null ) {
      (await this.alertCtrl.create({
        header: 'Total amount error',
        subHeader: 'Total amount cant blank. Please update jobtype with price.',
        buttons: [{
          text: 'Ok',
          handler: () => console.log('Done')
        }]
      })).present();
      return false;
    }

    let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
    loading.present();

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    // Data Found from logged in staff
    dashboardPost.staff_type = data.staff_type; //Sub Staff or Main Staff
    dashboardPost.staff_id = data.id;

    if(this.quoteid > 0) {
      dashboardPost.quoteid = this.quoteid;
      dashboardPost.qdid = Number(this.qdid);
    }else{
      dashboardPost.quoteid = 0;
      dashboardPost.qdid = 0;
    }

    dashboardPost.saveBtnStep = this.saveBtnStep;

    //Submitted Form Data
    dashboardPost.isLead = this.isLead;
    dashboardPost.jobdate = this.jobdate;
    dashboardPost.postcode = this.postcode;
    dashboardPost.suburb = this.suburb;
    dashboardPost.cleaningtypedata = this.popupDataArr;
    dashboardPost.whitegoods = this.whitegoods;
    dashboardPost.parking = this.parking;
    dashboardPost.petsproperty = this.petsproperty;
    dashboardPost.amount = this.amount;
    dashboardPost.cxname = this.cxname;
    dashboardPost.cxemail = this.cxemail;
    dashboardPost.cxphone = this.cxphone;
    dashboardPost.cxcomment = this.cxcomment;
    dashboardPost.cxaddress = this.cxaddress; 
    dashboardPost.cxbesttime = this.cxbesttime;

    console.log(dashboardPost);

    this.dashboardProvider.createQuoteSubmit(dashboardPost,'createQuoteSubmit')
    .then(
      async (result) => {

        this.responseArr = this.dashboardProvider.returnResponseByNativeHttp(result);
        this.responseArr = Array.of(this.responseArr);
        this.response = this.responseArr[0]["result"][0]["msg"];
        this.quoteid = this.responseArr[0]["result"][0]["quoteid"];
        this.responseVal = this.responseArr[0]["status"];
        this.statusText = this.responseArr[0]["message"];

        if(this.response == "Success"){
          this.resetValues();
        }

        const toast = await this.toastCtrl.create({
          message: this.response,
          duration: 2000
        });
        toast.present();

        console.log(this.response)
        console.log(this.responseVal)
        console.log(this.responseArr)
        loading.dismiss();  
      },
      (err) => {
        let response = this.dashboardProvider.returnResponseByNativeHttpError(err); //JSON.parse(JSON.stringify(err));
        console.log(response)
        loading.dismiss();
      } 
    )
  }

  getJobTypeData(){
    const dashboardPost: any = {};

    this.dashboardProvider.getJobType(dashboardPost, "getJobType").then(
      result => {
        this.getJobType = this.dashboardProvider.returnResponseByNativeHttp(result);
        this.getJobType = Array.of(this.getJobType);
        this.defaultData = this.getJobType[0]["result"][0]["data"];
        //console.log(this.getJobType);
      },
      err => {
        console.log(err);
      }
    );
  }

  async jobtypefields(event) {
    this.jobtype = event.detail.value;
    console.log( event.detail ); 
    if(this.jobtype > 0 ){
      
      // TODO: uncomment later
      let cleaningPopover = await this.modalController.create(
        {
          component : CleaningpopupPage,
          swipeToClose: true,
          backdropDismiss:true,
          keyboardClose:true,
          showBackdrop:true,
          
          componentProps : {
            jobtype: event.detail.value,
            label: event.detail.value,
            jobFormData: this.popupDataArr ? this.popupDataArr.filter((job) => {        
              console.log(job.jobtype +'---'+this.jobtype);
              return (job.jobtype == event.detail.value);
            }): null
          },
          //translucent: true
      })
      cleaningPopover.present(); 

      let jobIndex: any = null;
      cleaningPopover.onDidDismiss().then(
        async (dataReturned) => {        
        if(dataReturned.data != null) {
          this.popupData = JSON.parse(dataReturned.data);    
          if(this.popupDataArr.length > 0) {
            jobIndex = this.popupDataArr.find(job => (job.jobtype == this.popupData['jobtype']));
            (jobIndex == undefined) ? this.popupDataArr = [...this.popupDataArr, this.popupData] : 
            this.popupDataArr.filter((job, index) => {              
              if(job['jobtype'] == this.popupData['jobtype']) {                           
                this.popupDataArr[index] = this.popupData;
              }
            });
          } else {
            this.popupDataArr = [...this.popupDataArr, this.popupData];
          }

          this.calcTotal();
        }
        //console.log(this.popupDataArr);
        this.jobtype = 0;
      })
    } else {
      this.calcTotal();
    } 
   }

  switchTabs(event){
    this.quotetabs = event;
  }

  calcTotal(){
    this.totalAmt = 0;
    this.popupDataArr.forEach(item => {
      if(item.typeamount !== "undefined"){
        this.totalAmt = this.totalAmt + parseInt(item.typeamount);
      }
    });
    this.amount = this.totalAmt;
  }

  async postcodelist(ev){
    let loading = await this.loadingCtrl.create({message: 'Please wait', spinner: 'circles'});
    
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;
    dashboardPost.search_postcode = ev.target.value;

    if( ev.target.value.length > 3 ){
      loading.present();

      this.dashboardProvider.getPostCode(dashboardPost, "getPostCode").then(
        async result => {
          this.getPostCode = this.dashboardProvider.returnResponseByNativeHttp(result);
          this.getPostCode = Array.of(this.getPostCode);
          console.log('*************')
          console.log(this.getPostCode)
          this.defaultData2 = this.getPostCode[0]["result"][0]["data"];

          // #### JUST CHECK ONCE AGAIN TO KNOW ABOUT THE POST CODES LIST
          if( this.defaultData2.length > 0 ) {
            this.defaultData2 = this.getPostCode[0]["result"][0]["data"];
          } else {
            (await this.alertCtrl.create({
              header: "Suburbs List",
              subHeader: `We did not find suburbs for the postcode - ${ev.target.value}`,
              buttons: [
                {
                  text: "Please try again",
                  handler: () => console.log('No postcodes')
                }
              ]
            })).present();
          }          
          console.log(this.defaultData2)
          console.log(this.getPostCode);
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
    }
  }

  updateSearchResults(){
    if (this.cxaddress == '') {
      this.autocompleteItems = [];
      return;
    }
    
    if( this.cxaddress.length > 3 && this.cxaddress.length < 18 ){
      this.GoogleAutocomplete.getPlacePredictions({ input: this.cxaddress, componentRestrictions: {country: 'au'}, },
        (predictions, status) => {
          this.autocompleteItems = [];

          // #### VERIFY BEFORE EXECUTING
          if( predictions != null ) {
            this.zone.run(() => {
              predictions.forEach((prediction) => {
                this.autocompleteItems.push(prediction);
              });
            });
          }           
        });

        console.log(this.autocompleteItems);

    }
  }

  selectSearchResult(item){
    this.autocompleteItems = [];
    console.log(item.description);
    this.cxaddress = item.description;
  }


  resetValues(){
    this.jobdate = '';
    this.postcode = '';
    this.suburb = '';
    this.popupDataArr = [];
    this.whitegoods = '';
    this.parking = '';
    this.petsproperty = ''; 
    this.amount = 0;
    this.cxname = '';
    this.cxemail = '';
    this.cxphone = '';   
    this.cxcomment = '';
    this.cxaddress = '';
    this.cxbesttime = '';
  }

  async getsmsdata(quoteid, phone){

    let loading = await this.loadingCtrl.create({
      message: "Sms is sending to ${phone}" ,
      spinner: "circles"
    });
    await loading.present();

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};
    dashboardPost.staff_id = data.id;
    dashboardPost.quoteid = quoteid;
    dashboardPost.staff_type = data.staff_type;

    await this.dashboardProvider.getQuoteSMS(dashboardPost, "getQuoteSMS").then(
      result => {
        this.getQuoteSMS = this.dashboardProvider.returnResponseByNativeHttp(result);
        this.getQuoteSMS = Array.of(this.getQuoteSMS);
        this.sms_message = this.getQuoteSMS[0]["result"][0]["smstext"];
        this.sms_number = phone; //this.getQuoteSMS[0]["result"][0]["smsnumber"];
        this.sms_success = this.getQuoteSMS[0]["result"][0]["successmsg"];
        this.sms_fail = this.getQuoteSMS[0]["result"][0]["failmsg"];
        this.smsnotes = this.getQuoteSMS[0]["result"][0]["smsnotes"];
        console.log(this.getQuoteSMS);
      },
      async err => {
        loading.dismiss()
        console.log(err);
        (await this.alertCtrl.create({
          header: "Server Error",
          subHeader: 'Sms not sent. Please try again.',
          buttons: [
            {
              text: 'Please try again',
              handler: () => console.log('Closed')
            }
          ]
        })).present()
      }
    );

    // TODO: bbc sms provider uncomment later
    // await this.sms.smsByDevice(phone, this.sms_message, this.sms_success, this.sms_fail)
    // .then( async _ => {
      
    //   dashboardPost.smsnotes = this.smsnotes;
    //   dashboardPost.smsrespnumber = _;
    //   dashboardPost.smsnumber = this.sms_number;

    //   await this.dashboardProvider.sendQuoteSmsResponse(dashboardPost, "sendQuoteSmsResponse").then(
    //     result => {
    //       this.sendQuoteSmsResponse = this.dashboardProvider.returnResponseByNativeHttp(result);
    //       console.log(this.sendQuoteSmsResponse); 
    //       loading.dismiss()         
    //     },
    //     async err => {
    //       loading.dismiss()
    //       console.log(err);
    //       (await this.alertCtrl.create({
    //         header: "Sms to - ${quoteid}",
    //         subHeader: 'Sms not sent. Please try again.',
    //         buttons: [
    //           {
    //             text: 'Please try again',
    //             handler: () => console.log('Closed')
    //           }
    //         ]
    //       })).present()
    //     }        
    //   );
    // })
    // .catch(async _ => {
    //   loading.dismiss();
    //   (await this.alertCtrl.create({
    //     header: "Sms error occurred on - ${quoteid}",
    //     subHeader: 'A problem occured in sms sending. Please try again and check mobile number.',
    //     buttons: [
    //       {
    //         text: 'Please try again',
    //         handler: () => console.log('Closed')
    //       }
    //     ]
    //   })).present()
    // })

  }

  sendQuoteEmail(quoteid){
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};
    dashboardPost.staff_id = data.id;
    dashboardPost.quoteid = quoteid;
    dashboardPost.staff_type = data.staff_type;

    if( dashboardPost.quoteid.length > 0 ){
      this.dashboardProvider.sendQuoteEmail(dashboardPost, "sendQuoteEmail").then(
        async result => {
          this.sendQuoteEmailData = this.dashboardProvider.returnResponseByNativeHttp(result);
          this.sendQuoteEmailData = Array.of(this.sendQuoteEmailData);  
          this.defaultDataMsg = this.sendQuoteEmailData[0]["result"][0]["msg"];
          const toast = this.toastCtrl.create({
            message: this.defaultDataMsg,
            duration: 3000 
          }); 
          (await toast).present();
        },
        err => {
          console.log(err);
        }
      ); 
    }


  }

  async convertToQuote(quoteid){

    if( this.amount == 0 || this.amount == null ) {
      (await this.alertCtrl.create({
        header: 'Total amount error',
        subHeader: 'Total amount cant blank. Please update jobtype with price.',
        buttons: [{
          text: 'Ok',
          handler: () => console.log('Done')
        }]
      })).present();
      return false;
    }
    
    this.saveQuote(2);
    await this.leadStatusChange(4, quoteid);

    console.log(quoteid);
    this.showSMSEmailBtn = true;
    this.showCreateQuoteBtn = false;
    this.showSaveBtn = false;

    //this.navCtrl.pop();

  }

  async leadStatusChange(lead_status, quoteid){
    // let loading = this.loadingCtrl.create({content: 'Please wait', spinner: 'ios'});
    // await loading.present();
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};
    dashboardPost.staff_type = data.staff_type;
    dashboardPost.staff_id = data.id;
    dashboardPost.quoteid = quoteid;
    dashboardPost.lead_status = lead_status;

    await this.dashboardProvider.leadStatusChange( dashboardPost , 'leadStatusChange' )
    .then(async (result) => {
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttp(result);
      this.dashboardData = Array.of(this.dashboardData);
      //this.leadstatusmsg = this.dashboardData[0]["result"][0]["msg"];
      //console.log(this.leadstatusmsg);
      //loading.dismiss();
      //await this.getLeadList(this.viewleadtabs);
    }, (err) => {
      console.log(err);
      //loading.dismiss();
      this.dashboardData = this.dashboardProvider.returnResponseByNativeHttpError(err); //JSON.parse(JSON.stringify(err));
    });

  }

}
