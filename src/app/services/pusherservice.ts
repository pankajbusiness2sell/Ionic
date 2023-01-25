import { Injectable } from "@angular/core";


declare const Pusher: any;

@Injectable()
export class pusherservice {
    private channel: any;
    constructor() {
        
      
        }

        // Main BCIC Pusher Id
        setchannel() {
          Pusher.logToConsole = true;
          var pusher = new Pusher('472973d7595cc505608e', {
            cluster: 'ap1',
            forceTLS: true
          });
          this.channel = pusher.subscribe('my-channel');  
          return true;
        }

        // Main BCIC Pusher Id
        setchannel2() {
          Pusher.logToConsole = true;
          var pusher = new Pusher('55ffe186b14abe98e363', {
            cluster: 'ap4',
            forceTLS: true
          });
          this.channel = pusher.subscribe('my-channel');  
          return true;
        }
        getchannel() {  
            return this.channel;
          }
}


