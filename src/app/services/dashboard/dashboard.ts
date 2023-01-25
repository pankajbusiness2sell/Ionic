import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { AuthServiceProvider } from '../auth-service/auth-service';
import { AccessUrlsProvider } from '../access-urls/access-urls';
import { CustomNetworkProvider } from '../custom-network/custom-network';
import { Platform } from '@ionic/angular';

/*
  Generated class for the DashboardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DashboardProvider {

  platformList: string = '';
  isApp: boolean = true;

  constructor(
    public accessUrl: AccessUrlsProvider, 
    public auth: AuthServiceProvider, 
    public http: HTTP, 
    public httpClient: HttpClient,
    public customNetworkProvider: CustomNetworkProvider,
    public platform: Platform
  ) {
    //console.log('Hello DashboardProvider Provider');
  }

  getDashboardData(credentials, type) {
    let platforms = this.platform.platforms();
    console.log(platforms);    
    this.platformList = platforms.join(', ');    
    if( this.platform.is("desktop") ) {
      return this.getDashboardDataByDesktop(credentials, type);
    } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
      return this.getDashboardDataByDevice(credentials, type);
    }       
  }

  getDashboardDataByDesktop(credentials, type) {
    return new Promise((resolve, reject) => {
      this.httpClient.post( this.accessUrl.provideUrls() + type, JSON.stringify(credentials) , {} )
      .subscribe(data => {
        //console.log(data);
        resolve(data);        
      }, (err) => {        
        reject(err)
      })
    }); 
  }

  //#### INVOKED DASHBOARD DEFAULT DATA
  getDashboardDataByDevice(postData , type) {

    //#### FOR ACTIVE | NEW | RECLEAN
    return new Promise((resolve, reject) => {
      this.http.setServerTrustMode('nocheck');
      this.http.setDataSerializer('json');

      this.http.post( this.accessUrl.provideUrls() + type, postData , {"Content-Type": "application/json"} )
      .then(data => {
        resolve(data)  
      })
      .catch(err => {
        reject(err)
      })
    })

    // return new Promise((resolve , reject) => {

    //   //#### MAKE THE REQUEST FOR GETTING DASHBOARD DEFAULT DETAILS
    //   this.http.post(this.accessUrl.provideUrls() + type, JSON.stringify(postData), {})
    //   .then(data => {
    //     resolve(data);
    //   }, (err) => {
    //     reject(err)
    //   })

    // });

  }

    //#### PREPARE NEW REQUEST FOR GETTING NEW JOBS JSON
    removalPayment( postData , type ) {

      console.log(this.accessUrl.provideUrls());
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING NEW JOBS JSON
    getNewJobByRequest( postData , type ) {
  
      console.log(this.accessUrl.provideUrls());
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING ACTIVE JOBS JSON
    getActiveJobByRequest( postData , type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING TEAM SIZE
    teamWorking( postData , type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING TEAM SIZE
    addextra_hour( postData , type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING DETAILS OF JOB
    getActiveJobDetail( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData, type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING DETAILS OF JOB
    getJobDetail( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData, type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING RECLEAN JOBS JSON
    getRecleanJobByRequest( postData , type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING COMPLETED JOBS JSON
    getCompleteJobByRequest( postData , type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING ALL DIFFERENT JOBS JSON
    getAllJobByRequest( postData , type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING ALL DIFFERENT JOBS JSON
    getAllJobForAccount( postData , type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR SENDING IMAGES TO SERVER
    sendBeforeImages( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING ALL IMAGES FROM SERVER BY => TYPE
    getImages( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR DELETING IMAGE
    deletePhoto( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR UPSELL 1 | 2
    chooseUpSell( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR JOB START STATUS 1 | 2
    jobStartStatus( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE SCROLLING REQUEST FOR GETTING NEXT 10 RECORDS
    getScrollData( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR MAKING STATUS FOR NEW JOB ACCEPT OR DENY
    jobAcceptDenyStatus( postData , type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise( postData , type );
  
    }
  
    //#### PREPARE NEW REQUEST FOR GETTING ALL IMAGES FROM SERVER BY => TYPE
    updateInfo( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR START THE JOB WITH PATAMANETER
    //#### PARAMETER FOR ROOMS || PROPERTY
    acceptDetailBeforeJobStart( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR SUB STAFF LIST ON LOAD
    getSubStaffList( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR ADDING SUB STAFF
    addSubStaff( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR MAKING REAASIGN
    jobReassingStatus( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR ASSIGN JOB TO SUB STAFF
    assignJobToSubStaff( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR ASSIGN JOB TO SUB STAFF
    receivePaidStatus( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    logout( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    getItems( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    readJobNotes( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    getChatDataLoadMore( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    getChatData( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    needAssistant( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    sendChatText( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    sendChatUnReadCount( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    calender( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    updateDateAvail( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
  
    //#### PREPARE NEW REQUEST FOR STAFF LOGOUT
    agreeTc( postData, type ) {
  
      //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
      return this.returnPromise(postData, type);
  
    }
  
    //#### FOR INVOKING CALL FROM CORE OF DEVICE
    //#### CALL TO ADMIN THROUGH
    callToAdmin() {
  
      let adminNum = localStorage.getItem('adminNum');
      console.log(adminNum);
      // window.open('tel:'+adminNum, '_self');
  
      window.open("tel:" + adminNum, "_blank");
  
    }
  
    //#### FOR INVOKING CALL FROM CORE OF DEVICE
    //#### CALL TO CUSTOMER THROUGH
    callToCustomer(postData, type) {
  
      return this.returnPromise(postData, type);
    }
  
    getReview(postData, type) {
  
      return this.returnPromise(postData, type);
    }
  
    requestToFetchStaffLocation(postData, type) {
  
      return this.returnPromise(postData, type);
    }
   
    CheckedContactTime(postData, type) {    
  
      return this.returnPromise(postData, type);
    }  
  
    getTimeDD(postData, type) {
  
      return this.returnPromise(postData, type);
    }
  
  
    // BBC APP API DATA - START //
  
    addLeadSetting( postData, type ) {
      return this.returnPromise(postData, type);
    }
  
    getLeadData( postData, type ) {
      return this.returnPromise(postData, type);
    }
  
    getQuoteData( postData, type ) {
      return this.returnPromise(postData, type);
    }
  
    getViewQuoteList(postData, type) {
      return this.returnPromise(postData, type);
    }
  
    // Get Job Type
    getJobType(postData, type){
      return this.returnPromise(postData, type);
    }
  
    // Get SMS Data
    getQuoteSMS(postData, type){
      return this.returnPromise(postData, type);
    }
  
    // Post SMS Data
    sendQuoteSmsResponse(postData, type){
      return this.returnPromise(postData, type);
    }
  
    // Post Email Data
    sendQuoteEmail(postData, type){
      return this.returnPromise(postData, type);
    }

    // Post Email Data
    makePaymentPage(postData, type){
      return this.returnPromise(postData, type);
    }
    
    // Post Assign ReClean Request
    assignReclean(postData, type){
      return this.returnPromise(postData, type);
    }
        
    // Fetch Notes Data
    getNotes(postData, type){
      return this.returnPromise(postData, type);
    }
  
    // Save Notes Data
    saveNotesSubmit(postData, type){
      return this.returnPromise(postData, type);
    }
  
    createQuoteSubmit(postData, type){
      return this.returnPromise(postData, type);
    }
  
    // Get PostCode List Autoseach
    getPostCode( postData, type ){
      return this.returnPromise(postData, type);
    }
  
    // Get PostCode List Autoseach
    getQuoteAmount( postData, type ){
      return this.returnPromise(postData, type);
    }
  
    //#### Get Lead List Start
    getLeadList( postData, type ) {
      return this.returnPromise( postData, type );
    }
    
    //#### Change Lead Status
    leadStatusChange( postData, type ) {
      return this.returnPromise( postData, type );
    } 
  
    //#### Get Lead Status List Start
    getLeadStatusDD( postData, type ) {
      return this.returnPromise( postData, type );
    }
    
    bbcJobPayment( postData, type ) {
      return this.returnPromise(postData, type);
    }

    getParkingList( postData, type ) {
      return this.returnPromise(postData, type);
    }

    assignComplaint( postData, type ) {
      return this.returnPromise(postData, type);
    }

    invoiceEmail( postData, type ) {
      return this.returnPromise(postData, type);
    }
    
    // BBC APP API DATA - END //
    
    

  //#### RETURN PROMISE FOR POST
  returnPromise( postData , type ) {

    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    postData.work_type = data.work_type;

    let platforms = this.platform.platforms();
    console.log(platforms);    
    this.platformList = platforms.join(', ');    
    if( this.platform.is("desktop") ) {
      return this.returnPromiseByDesktop(postData , type);
    } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
      return this.returnPromiseByDevice(postData , type);
    } 

    // return new Promise((resolve, reject) => {

    //   //#### EXTRACT THE REQUEST FOR GETTING NEW JOBS BY STAFF ID
    //   //this.http.post( this.accessUrl.provideUrls() +  type, JSON.stringify(postData) , {headers: {}} )

    //   this.http.post( this.accessUrl.provideUrls() +  type, JSON.stringify(postData) , {headers: {}} )

    //   .then(data => {

    //     resolve(data);

    //   }, (err) => {

    //     reject(err);

    //   })

    // });

  }

  returnPromiseByDesktop(postData , type) {
    return new Promise((resolve, reject) => {
      this.httpClient.post( this.accessUrl.provideUrls() + type, JSON.stringify(postData) , {} )
      .subscribe(data => {
        console.log(data);
        resolve(data);        
      }, (err) => {        
        reject(err)
      })
    }); 
  }

  returnPromiseByDevice(postData , type) {
    return new Promise((resolve, reject) => {
      this.http.setServerTrustMode('nocheck');
      this.http.setDataSerializer('json');
      
      this.http.post( this.accessUrl.provideUrls() + type, postData , {"Content-Type": "application/json"} )
      .then(data => {
        // alert('returnPromise - Success')  
        resolve(data)
      })
      .catch(err => {     
        // alert('Pls check returnPromise url-POST-TOPOST')
        reject(err)
      })
    })
  }

  //#### RETURN PROMISE FOR GET
  returnGetPromise( type ) {


    return new Promise((resolve, reject) => {
      this.http.setServerTrustMode('nocheck');
      this.http.setDataSerializer('json');

      this.http.get( this.accessUrl.provideUrls() + type, {} , {} )
      .then(data => {
        // alert('getWelcomeData - Success')  
        resolve(data)
      })
      .catch(err => {     
        // alert('Pls check getWelcomeData url-POST-TOPOST')
        reject(err)
      })
    })

    // return new Promise((resolve, reject) => {

    //   //#### EXTRACT THE REQUEST FOR GETTING NEW JOBS BY STAFF ID
    //   this.http.get( this.accessUrl.provideUrls() +  type, {headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }} )
    //   .subscribe(data => {

    //     resolve(data);

    //   }, (err) => {

    //     reject(err);

    //   })

    // });

  }

  //#### BUILD GET REQUEST

  //#### PREPARE NEW REQUEST FOR SENDING IMAGES TO SERVER
  getWelcomeData( type ) {

    //#### RETURN BEST PROMISE AND MAKE ASYNCHRONOUS
    return this.returnGetPromise(type);

  }

  returnResponseByNativeHttp = (result: any) => {
    if( this.platform.is("desktop") ) {
      return result;  
    } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
      return JSON.parse(result['data']);  
    }     
  }

  returnResponseByNativeHttpError = (result: any) => {   
    if( this.platform.is("desktop") ) {
      console.log(result['error']['result']);
      return result['error']['result'];
    } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
      console.log(result);
      return JSON.parse(result['error'])['result'];
    }    
  }

  returnCommonResult = (result: any) => {
    return JSON.parse(result);    
  }

}
