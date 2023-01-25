
import { Injectable } from '@angular/core';

/*
  Generated class for the AccessUrlsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccessUrlsProvider {

  constructor() {
    console.log('Hello AccessUrlsProvider Provider');
  }

  provideUrls() {

    //#### FOR LIVE AND PUBLISHING PURPOSE
    //return "https://api.bcic.com.au/staff/";

    // https://api.bcic.com.au/

    // http://beta.bcic.com.au/staff_api/

    //#### FOR BETA AND DEVELOPMENT PURPOSE
    //return "https://staffapp.bcic.com.au/staff_bbc/";  

    return "https://bbcapp.betterbondcleaning.com.au/staff/";


  }

  testUrl() {
    return "http://api.bcic.com.au/test.php";
  }

}   
