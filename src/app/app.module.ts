import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

// CUSTOM MODULES
import { AuthServiceProvider } from './services/auth-service/auth-service';
import { DashboardProvider } from './services/dashboard/dashboard';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AccessUrlsProvider } from './services/access-urls/access-urls';
import { BeforedataProvider } from './services/beforedata/beforedata';
import { ShownimagesProvider } from './services/shownimages/shownimages';
import { CustomPromisesProvider } from './services/custom-promises/custom-promises';
import { DatePipe } from '@angular/common';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';
// import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CustomNetworkProvider } from './services/custom-network/custom-network';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { CookieService } from 'ngx-cookie-service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { pusherservice } from './services/pusherservice';
import { EventsService } from './events.service';   
//import { SafePipe } from './pipes/safe/safe';  
//import { NumtoarrayPipe } from './pipes/numtoarray/numtoarray';
// import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
//import {EventsService} from './services/events/events.service';


import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { SmsProvider } from './services/sms/sms';
import { ExternalProvider } from './services/external/external';
  
       
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal,
    AuthServiceProvider,
    HTTP,
    HttpClient,
    AuthServiceProvider,
    CookieService,
    DashboardProvider,
    AndroidPermissions,
    LocationAccuracy,
    Geolocation,
    AccessUrlsProvider,
    Device,
    Network,
    //OneSignal,
    CustomNetworkProvider,
    Diagnostic,
    FileChooser,
    FilePath,
    File,
    FileOpener,
    PhotoViewer,
    ImagePicker,
    Camera,
    LocalNotifications,
    BeforedataProvider,
    ShownimagesProvider,
    CustomPromisesProvider,
    //CallNumber,
    Base64,
    pusherservice,
    EventsService,
    DatePipe,
    // NativeGeocoder,
    SMS,
    SmsProvider,
    ExternalProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
