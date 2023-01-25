import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';

/*
  Generated class for the CustomNetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomNetworkProvider {

  constructor(private network: Network, public alertCtrl: AlertController) {
    console.log('Hello CustomNetworkProvider Provider');
  }

  checkConnection() {
    console.log('Ashish');
    this.alertCtrl.create({
        header: 'Connected When onDisconnect',
        buttons: ['ok']
      })

    // let disconnectSub = this.network.onDisconnect().subscribe(() => {
    //   console.log('you are offline.. please check your device connection settings.');
    //   this.alertCtrl.create({
    //     title: 'No Internet Connection',
    //     buttons: [{
    //       text: 'Retry Connection',
    //       handler: () => {
    //         this.checkOnConnect();
    //       }
    //     }]
    //   })
    // }, () => {
    //   this.alertCtrl.create({
    //     title: 'Connected When onDisconnect',
    //     buttons: ['ok']
    //   })
    // });
  }

  checkOnConnect() {

    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    this.network.onConnect().subscribe(() => {
      this.alertCtrl.create({
        header: 'Connected',
        buttons: ['ok']
      })
    }, () => {
      this.alertCtrl.create({
        header: 'No Internet Connection on ONConnect',
        buttons: [{
          text: 'Retry Connection',
          handler: () => {
            this.checkOnConnect();
          }
        }]
      })
    });
  }

}
