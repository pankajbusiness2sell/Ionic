import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { BeforedataProvider } from '../services/beforedata/beforedata';
import { DashboardProvider } from '../services/dashboard/dashboard';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  public photos: any;
  public printPhoto: any;
  public base64Image: string;
  public jobData: any;
  public beforeImages = [];
  public showImage = false;
  public path: string;
  public baseString: any;
  public imgErr: any;
  public imgCount: number;
  public action: number;
  public title: string;
  public job_image_type_text: string;

  //#### SET THE CAMERA OPTIONS
  public options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true,
    targetHeight: 1000,
    targetWidth: 1000
    //sourceType: 0
  }
  beforeImageData: any[];

  constructor(
    private route: ActivatedRoute, 
    public actionSheet: ActionSheetController,
    public beforeData: BeforedataProvider,
    public dashboardProvider: DashboardProvider,
    //private localNoti:LocalNotifications,
    public camera: Camera,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private imagePicker: ImagePicker,
    private base64: Base64
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.jobDataForBeforePage) {
        this.jobData = JSON.parse(params.jobDataForBeforePage);
        this.action = params.action;
      }
    });
  }

  ngOnInit() {
    this.imgCount = 0;
    this.photos = [];
    this.printPhoto = [];
    this.beforeImageData = [];
    this.action = 0;
    this.job_image_type_text = 'checklist';
    this.title = 'CheckList Upload';

    // this.jobData = this.navParams.get('jobDataForBeforePage');
    // this.action = this.navParams.data.action;

    //#### INVOKE DEFAULT IMAGE LIST
    // this.makeTextAAccordingToAction();
    this.getBeforeImages();
  }

  makeTextAAccordingToAction() {
    if(this.action == 3) {
      this.title = 'CheckList Upload';
      this.job_image_type_text = 'checklist';
    }

    if(this.action == 4) {
      this.title = 'No Guarantee Images';
      this.job_image_type_text = 'guarantee';
    }

    if(this.action == 5) {
      this.title = 'Upsell Images';
      this.job_image_type_text = 'upsell';
    }

    console.log(this.title + '-xx-' + this.action);
  }

  //#### SET UP ACTION TO LOAD DEFAULT BEFORE IMAGES
  getBeforeImages() {

    // let loading = this.loadingCtrl.create({content: 'Fetching images', spinner: 'ios'});
    // loading.present();

    //#### INITIALIZE IMAGE ARRAY
    this.beforeImageData = [];

    //#### MAKE DEFAULT REQUEST FOR BEFORE IMAGES IF WE HAVE
    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));

    const dashboardPost: any = {};

    //#### FLUSH BEFORE IMAGE DATA
    this.beforeImageData = [];

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.job_image_type = this.job_image_type_text;

    //#### THIS IS STAFF JOB ID
    dashboardPost.job_id = this.jobData.jobID;

    //#### THIS IS STAFF JOB ID
    if( this.jobData.reclean_id ) {
      dashboardPost.reclean_id = this.jobData.reclean_id;
    }

    console.log(dashboardPost);


    this.dashboardProvider.getImages(dashboardPost, 'fetchJobWorkPhoto')
    .then( (result) => {

      // loading.dismiss();

      console.log(result);

      const beforeImageCounter = this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['data']['checklist'];
      if( this.dashboardProvider.returnResponseByNativeHttp(result)['result'][0]['data']['checklist'] === 'undefined' ) {
        this.beforeImageData = [];
        this.showImage = false;
        return false;
      } else {
        if( beforeImageCounter.length > 0 ) {
          for( let i = 0; i < beforeImageCounter.length; i++ ) {
            this.beforeImageData.push( beforeImageCounter[i] );
            console.log(beforeImageCounter[i]);
          }

          this.showImage = true;
          console.log(this.showImage);
        } else {
          this.beforeImageData = [];
          this.showImage = false;
        }
      }

    }, (err) => {
      // loading.dismiss();
      console.log(err);
      this.showImage = false;
    });

  }

  //#### SET UP ACTION SHEET FOR ASKIGN HOW DO GET PICTURES TO UPLOAD
  async takePhoto() {
    await this.selectMultiple();
  }

  //#### SET UP ACTION SHEET FOR ASKIGN HOW DO GET PICTURES TO UPLOAD THROUGH CAMERA DIRECT
  takePhotoByCamera() {

    //SET FOR GALLERY
    this.options.sourceType = 1;
    this.options.mediaType = this.camera.MediaType.PICTURE;

    //#### INVOKE IMAGE REQUEST
    this.sendPhotoRequestBySource();
  }

  async takePhoto2() {

    //#### INVOKE ACTION SHEET CTRL
    await (await this.actionSheet.create({
      header: 'Select Image Source',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Load Gallery',
          handler: () => {

            this.selectMultiple();

          }
        },
        {
          text: 'Camera',
          handler: () => {

            //SET FOR GALLERY
            this.options.sourceType = 1;
            this.options.mediaType = this.camera.MediaType.PICTURE;

            //#### INVOKE IMAGE REQUEST
            this.sendPhotoRequestBySource();

          }
        },
        {
          text: 'Cancel',
          role: 'Cancel'
        }
      ]
    })).present();

  }

  async selectMultiple() {

    let option = {
      title: 'Select images',
      maximumImagesCount: 10,
      width: 600,
      height: 600,
      quality: 50,
      //outType: 0  
      outputType: 1
    }
    
    await this.imagePicker.getPictures(option)
    .then(async (results) => { 
      console.log('----New1112------', results);
      let k = 1;
      for( var i = 0; i < results.length; i++, k++ ) { 
        console.log('----------------New 22---', results[i]);
        this.base64Image = 'data:image/jpeg;base64,' + results[i].replace(/(\r\n\t|\n|\r\t)/gm,"");
        console.log('checking -xx-',this.base64Image)

        //#### PUSH ALL PHOTOS INTO ARRAY
        //this.photos.push(this.base64Image);

        //#### SENDING TO SERVER ONE BY ONE
        this.uploadMultipleBefore( this.base64Image );
      }

      if( k > 1 ) {
        (await this.alertCtrl.create({
          header: 'Image Uploaded',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.getBeforeImages();
              }
            }
          ]
        })).present();
      }
    }, err => {
      alert(err);
      this.imgErr = err;
    })
  }

  selectMultiple_old() {

    let option = {
      title: 'Select images',
      maximumImagesCount: 10,
      width: 600,
      height: 600,
      quality: 50,
      //outType: 0
      //outputType: 1
    }

    this.imagePicker.getPictures(option)
    .then(async (results) => {
      let k = 1;
      for( var i = 0; i < results.length; i++, k++ ) {

        this.base64.encodeFile(results[i]).then((base64File: string) => {
          let imgSourceWithoutTag = base64File.split("base64,")[1];
          this.base64Image = 'data:image/jpeg;base64,' + imgSourceWithoutTag.replace(/(\r\n\t|\n|\r\t)/gm,"");

          //#### PUSH ALL PHOTOS INTO ARRAY
          //this.photos.push(this.base64Image);

          //#### SENDING TO SERVER ONE BY ONE
          this.uploadMultipleBefore( this.base64Image );



        }, (err) => {
          console.log(err);
          this.imgErr = err;
        });


      }

      if( k > 1 ) {

        (await this.alertCtrl.create({
          header: 'Files uploaded',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.getBeforeImages();
              }
            }
          ]
        })).present();

      }


    }, err => {
      alert(err);
      this.imgErr = err;
    })

    //#### CHECK IF ANY IMAGE UPLOADED THAN ALLOW TO RUN HANDLER


  }

  selectMultiple2() {

    const options: any = {
      title: 'Select Pictures',
      message: 'Only 5 can select',
      maximumImagesCount: 5
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {

        //console.log('Image URI: ' + results[i]);

          //GET BASE^$ IMAGE INTO STRING
          this.base64Image = 'data:image/jpeg;base64,' + results[i];

          //#### PUSH ALL PHOTOS INTO ARRAY
          this.photos.push(this.base64Image);
        }
      }, (err) => {
        console.log(err);
      });

    // let options = {
    //   maximumImagesCount: 8,
    //   width: 500,
    //   height: 500,
    //   quality: 75
    // }

    // ImagePicker.getPictures(options).then(
    //   file_uris => console.log('called bhaiya'),
    //   err => console.log('uh oh')
    // );
  }

  public openGallery (): void {
    // let options = {
    //   maximumImagesCount: 8,
    //   width: 500,
    //   height: 500,
    //   quality: 75
    // }

    // ImagePicker.getPictures(options).then(
    //   file_uris => console.log('called bhaiya'),
    //   err => console.log('uh oh ', err)
    // );

    const options: any = {
      maximumImagesCount: 5,
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
      console.log('Image URI: ' + results[i]);
      }
      }, (err) => {
        console.log(err);
      });
  }

  //#### TAKE PICTURE THROUGH DEVICE CAMERA ON THE BASIS OF OPTIONS DEFINED
  sendPhotoRequestBySource() {

    //#### TAKE PICTURE
    this.camera.getPicture(this.options)
    .then((imageData) => {

      //GET BASE^$ IMAGE INTO STRING
      this.base64Image = 'data:image/jpeg;base64,' + imageData;

      //#### PUSH ALL PHOTOS INTO ARRAY
      this.photos.push(this.base64Image);

      //#### REVERSE THE ARRAY AND FORMAT UNDER LIFO STRUCTURE
      this.photos.reverse();

      //#### INVKE DIRECTT TO TO UPLOAD CAMERA TO SERVER
      this.uploadMultipleBefore(this.base64Image);

    }, (err) => {

      //#### ERROR HANDLER

    })

  }

  //#### NOW UPLOAD LL TAKE PICTURES
  uploadMultipleBefore( encodeImgSource ) {

    // let loading = this.loadingCtrl.create({content: 'Uploading ... ', spinner: 'ios'});
    // loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
    //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
    let data = JSON.parse(localStorage.getItem('afterLoginData'));
    const dashboardPost: any = {};

    //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
    dashboardPost.staff_type = data.staff_type;

    //#### THIS IS STAFF ID
    dashboardPost.staff_id = data.id;

    //#### THIS IS STAFF ID
    dashboardPost.job_image_type = this.job_image_type_text;

    //#### THIS IS STAFF JOB ID
    dashboardPost.job_id = this.jobData.jobID;

    //#### THIS IS STAFF JOB ID
    if( this.jobData.reclean_id ) {
      dashboardPost.reclean_id = this.jobData.reclean_id;
    }

    //#### THIS IS STAFF ID
    dashboardPost.images = JSON.stringify(encodeImgSource);

    //#### CHECK INTO CONSOLE HO WE ARE PASSING INTO REQUEST
    this.dashboardProvider.sendBeforeImages(dashboardPost, 'uploadImage')
    .then((result) => {

        // loading.dismiss();
        console.log(this.dashboardProvider.returnResponseByNativeHttp(result));
        this.imgCount++;

        // //#### MAKE A TOAST NOW
        // this.toastCtrl.create({
        //   message: "Upload successful",
        //   duration: 5000,
        //   position: 'bottom'
        // }).present();

    }, async (err) => {
      // loading.dismiss();
      console.log(err);
      (await this.alertCtrl.create({ header: 'error', buttons: ['ok'] })).present();
    });

  }

  //#### NOW UPLOAD LL TAKE PICTURES
  async uploadBefore() {

      let loading = await this.loadingCtrl.create({message: 'Uploading ... ', spinner: 'circles'});
      loading.present();

      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};

      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
      dashboardPost.staff_type = data.staff_type;

      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;

      //#### THIS IS STAFF ID
      dashboardPost.job_image_type = this.job_image_type_text;

      //#### THIS IS STAFF JOB ID
      dashboardPost.job_id = this.jobData.jobID;

      //#### THIS IS STAFF JOB ID
      if( this.jobData.reclean_id ) {
        dashboardPost.reclean_id = this.jobData.reclean_id;
      }

      //#### THIS IS STAFF ID
      dashboardPost.images = JSON.stringify(this.photos);

      //#### FLUSH CAMERA PICTURES FROM ARRAY
      this.photos = [];

      //#### CHECK INTO CONSOLE HO WE ARE PASSING INTO REQUEST
      this.dashboardProvider.sendBeforeImages(dashboardPost, 'uploadImage')
      .then(async (result) => {

          loading.dismiss();
          console.log(this.dashboardProvider.returnResponseByNativeHttp(result));

           //#### MAKE A TOAST NOW
           
          ( await this.toastCtrl.create({
            message: "Upload successful",
            duration: 5000,
            position: 'bottom'
          })).present();

          //#### INVOKE DEFAULT IMAGE LIST
          this.getBeforeImages();

      }, async (err) => {
        loading.dismiss();
        console.log(err);
        (await this.alertCtrl.create({ message: 'error', buttons: ['ok'] })).present();
      });

  }

  //#### DELETE TEMPORARY FROM SCREEN
  async deleteTmpPhoto(index) {
    (await this.alertCtrl.create({
      header: 'are you sure, you wanna delete it ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.photos.splice(index, 1);
          }
        }
      ]
    })).present();
  }

  async deletePhoto(photo) {
    (await this.alertCtrl.create({
      header: 'are you sure, you wanna delete it ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.removeImage(photo);
          }
        }
      ]
    })).present();
  }

  //#### REMOVE IMAGE FROM SCREEN
  async removeImage(photo: any) {

    let loading = await this.loadingCtrl.create({message: 'Removing', spinner: 'circles'});
    loading.present();

    //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem('afterLoginData'));
      const dashboardPost: any = {};

      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
      dashboardPost.staff_type = data.staff_type;

      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;

      //#### THIS IS STAFF JOB ID
      dashboardPost.image_id = photo.id;

      //#### CHECK INTO CONSOLE HO WE ARE PASSING INTO REQUEST
      this.dashboardProvider.deletePhoto(dashboardPost, 'deletePhoto')
      .then((result) => {

          loading.dismiss();

          console.log(this.dashboardProvider.returnResponseByNativeHttp(result));

          //#### INVOKE DEFAULT IMAGE LIST
          this.getBeforeImages();

      }, async (err) => {
        loading.dismiss();
        console.log(err);
        (await this.alertCtrl.create({ message: 'error', buttons: ['ok'] })).present();
      });

  }

  //#### OPEN IMAGE INTO FULL VIEW
  openImage(photo) {
    //this.photoViewer.show('https://www.bcic.com.au/mail/images/mail_img/defult_img.png');
    //this.photoViewer.show('https://www.bcic.com.au/mail/images/mail_img/defult_img.png');
  }

  //#### FOR PERFORMANCE
  trackPhoto(index, photo) {
    return photo ? photo.id : undefined;
  }

}
