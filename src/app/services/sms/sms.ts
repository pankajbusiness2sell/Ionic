import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { ToastController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';

/*
  Generated class for the SmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsProvider {

  constructor(
    public sms: SMS,
    public toastCtrl: ToastController,
    public device: Device
    ) {
    console.log('Hello SmsProvider Provider');
  }

  smsByDevice = (textNumber, textMessage, success, error): Promise<any> => {
    var options = {
      replaceLineBreaks: true,
      android: {
        intent: 'INTENT'
      }
    }
    
    if(this.device.platform && this.device.platform.toLowerCase() == 'android') {
      console.log("this.device.platform :: " + this.device.platform);
      return this.sms.hasPermission()
      .then(async () => {
        try {
          await this.sms.send(textNumber, textMessage, options)
          .then(async _ => {
            console.log('Success deliver to receiver');
            const toast = this.toastCtrl.create({
              message: 'Sms will send through sms messenger...',
              duration: 3000
            });
            (await toast).present();
            return 1;
          })
          .catch(async error => {
            console.log(error);
            console.log('Error deliver to sender back on console window');
            const toast = this.toastCtrl.create({
              message: 'Problem exists in phone number',
              duration: 3000
            });
            (await toast).present();
            return 0;
          }); 
        } catch {
          const toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            cssClass: "toast-scheme"
          });
          await (await toast).present();
          return 0;
        }
      })
      .catch((err) => {
        alert('DONT HAVE PERMISSION TO SEND SMS');
        return -1;
      }) 
    } else {
      return new Promise(async (resolve, reject) => {
        try {
          await this.sms.send(textNumber, textMessage, options)
          .then(async _ => {
            console.log('Success deliver to receiver');
            const toast = this.toastCtrl.create({
              message: 'Sms will send through sms messenger...',
              duration: 3000
            });
            (await toast).present();
            resolve(1);
          })
          .catch(async error => {
            console.log(error);
            console.log('Error deliver to sender back on console window');
            const toast = this.toastCtrl.create({
              message: 'Problem exists in phone number',
              duration: 3000
            });
            (await toast).present();
            reject(0);
          })        
        } catch {
          const toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            cssClass: "toast-scheme"  
          });
          (await toast).present();
          reject(0);
        }
      })
    }      
  }

}
