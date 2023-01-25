import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { AccessUrlsProvider } from '../access-urls/access-urls';
import { Platform } from '@ionic/angular';

@Injectable()
export class AuthServiceProvider {

  platformList: string = '';
  isApp: boolean = true;
   
  constructor(
    public http: HTTP,
    public accesUrls: AccessUrlsProvider,
    public httpClient: HttpClient,
    public platform: Platform
  ) {
    console.log('Hello AuthServiceProvider Provider');
    this.http.setServerTrustMode('nocheck');
  }

  login(credentials, type) {
    let platforms = this.platform.platforms();
    console.log(platforms);    
    this.platformList = platforms.join(', ');    
    if( this.platform.is("desktop") ) {
      return this.loginFromDesktop(credentials, type);
    } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
      return this.loginByDevice(credentials, type);
    }       
  }

  loginFromDesktop(credentials, type) {   
    //alert('Desktop');
    return new Promise((resolve, reject) => {
      this.httpClient.post( this.accesUrls.provideUrls() + type, JSON.stringify(credentials) , {} )
      .subscribe(data => {
        console.log(data);
        resolve(data);        
      }, (err) => {        
        reject(err)
      })
    }); 
  }

  
  loginByDevice(credentials, type) {    
    return new Promise((resolve, reject) => {
      this.http.setServerTrustMode('nocheck');
      this.http.setDataSerializer('json');
      this.http.setServerTrustMode('nocheck');
      this.http.post( this.accesUrls.provideUrls() + type, credentials , {"Content-Type": "application/json"} )
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
    })    
  }

  getUserDetails(credentials, type) {
    // this.http.setSSLCertMode('nocheck');
    // return this.http.post( this.accesUrls.provideUrls() + type, JSON.stringify(credentials) , {} );

    if( this.platform.is("desktop") ) {

      return new Promise((resolve, reject) => {
        this.httpClient.post( this.accesUrls.provideUrls() + type, JSON.stringify(credentials) , {} )
        .subscribe(data => {
          console.log(data);
          resolve(data);        
        }, (err) => {        
          reject(err)
        })
      });
      
    } else if( this.platform.is("android") || this.platform.is("ipad") || this.platform.is("iphone") ){
     
      return new Promise((resolve, reject) => {
        this.http.setServerTrustMode('nocheck');
        this.http.setDataSerializer('json');
        // this.http.post( 'https://api.bcic.com.au/staff/loginTest', {} , {} )
  
        this.http.post( this.accesUrls.provideUrls() + type, credentials , {"Content-Type": "application/json"} )
        .then(data => {
          resolve(data)
        })
        .catch(err => { 
          reject(err)
        })
      })
      
    }
  }

  provideUrls() {
    return "http://api.bcic.com.au/staff/";
  }

}
