import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {

  civilWorks : {};
   lang : any;
   notificationCount: 2;
  constructor() { }

  ngOnInit() {
       let data = JSON.parse(localStorage.getItem('afterLoginData'));
    console.log('User data : ', data);


    this.getData()

  }


  getData(){
  

     this.civilWorks = [
      {title: 'question 1', message:  "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a  Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a ", img: "nin-live.png", date: '5 Sep 20201'}, 
      {title :'question 2',  message: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a  Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a ",  img: "nin-live.png",date: '6 Sep 20201'}, 
      {title: 'question 3',  message: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a  Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a ",  img: "nin-live.png", date:'8 Sep 20201'}, 
    ];

      
    console.log(this.civilWorks);
    this.civilWorks = JSON.parse(JSON.stringify(this.civilWorks));
     //console.log(this.civilWorks);
  }

  refreshPage(){
    console.log('refress');
  }

  gotoChat( type = 0) {
    console.log('gochat');
  }

  moveToTask(){
    console.log('move');
  }

}

