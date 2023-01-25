import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  gpsInfo: any = {};
  constructor(
    private geolocation: Geolocation
  ) {
    console.log('Hello LocationProvider Provider');
  }

  // getGps = (): Promise<any> => {
  //   return new Promise(async (resolve, reject) => {
  //     let options = {timeout: 25000, enableHighAccuracy: true};
  //     const gpsResponse = await this.geolocation.getCurrentPosition(options)
  //     .then((resp) => {
  //       this.gpsInfo.latitude = resp.coords.latitude;
  //       this.gpsInfo.longitude = resp.coords.longitude;        
  //       alert(this.gpsInfo.latitude + " <=xx=> " + this.gpsInfo.longitude);
  //       resolve(this.gpsInfo);        
  //      }).catch((error) => {
  //        console.log('Error getting location <>', error); 
  //        reject(error);  
  //      });
  //   });    
  // }
}
