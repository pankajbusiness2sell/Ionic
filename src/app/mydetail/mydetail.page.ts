import { Component, OnInit } from '@angular/core';
import { DashboardProvider } from '../services/dashboard/dashboard';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AuthServiceProvider } from '../services/auth-service/auth-service';
import { AccessUrlsProvider } from '../services/access-urls/access-urls';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';



@Component({
  selector: 'app-mydetail',
  templateUrl: './mydetail.page.html',
  styleUrls: ['./mydetail.page.scss'],
})
export class MydetailPage implements OnInit {

  public event = {
    month: new Date().toISOString(),
    timeStarts: "07:43",
    timeEnds: "1990-02-20"
  };

  fname: string;
  email: string;
  phone: string;
  company_name: string;
  abn: string;
  insaurance: string;
  bsb: string;
  acc: string;
  new_pass: string;
  conf_pass: string;
  newInsaurance: string;
  insauranceEcpired: boolean;
  dd_check = [];

  defaultData: any;
  afterLogin: any[];
  isChecked: boolean;
  presult: any;

  userDetails: any;

  uploadText: any;
  downloadText: any;
  // fileTransfer: FileTransferObject;

  // other info
  public normalRates: boolean;
  public otoCheck: boolean;
  public commercial: boolean;

  constructor(
    public dashboardProvider: DashboardProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public datepipe: DatePipe,
    public loadingCtrl: LoadingController,
    public authServe: AuthServiceProvider,
    // private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    public accessUrl: AccessUrlsProvider
  ) { }

  ngOnInit() {
        //#### DEFAULT CHEKCED ADDED
        this.isChecked = true;
        this.uploadText = "";
        this.downloadText = "";
        this.insauranceEcpired = false;
        this.dd_check = [];
        this.normalRates = true;
        this.otoCheck = true;
        this.commercial = false;
    
        //#### FETCH USER DETAILS FROM SERVER
        console.log("Local Storage Data - My Detail Page");
        console.log(JSON.parse(localStorage.getItem("afterLoginData")));
        this.getUserDetails(JSON.parse(localStorage.getItem("afterLoginData")));
  }

    // #### FILE TRANSFER
    uploadStaffDocByType(invokeFunc: String) {

      /*this.fileChooser
        .open()
        .then(uri => {
          this.filePath
            .resolveNativePath(uri)
            .then(nativePath => {
  
              this.file.resolveLocalFilesystemUrl(nativePath).then(fileEntry => {
                fileEntry.getMetadata(async (metadata) => {
                    console.log(metadata.size);//metadata.size is the size in bytes
                    if( metadata.size < 3145728 ) {
                      const fileName = nativePath.split("/");
                      const fileNameWithExtension = fileName[fileName.length - 1];
  
                      // alert(fileNameWithExtension);
  
                      this.fileTransfer = this.transfer.create();
                      let options = {
                        fileKey: "file",
                        fileName: fileNameWithExtension,
                        chunkedMode: false,
                        headers: {
                          'X-USER-TOKEN': this.defaultData.id
                        },
                        mimeType: "multipart/form-data"
                      };
  
                      let loading = await this.loadingCtrl.create({
                        message: "Uploading your file, please wait...",
                        spinner : "circles",
                      });
                      loading.present();
                      this.fileTransfer
                        .upload(
                          nativePath,
                          this.accessUrl.provideUrls() + 'uploadStaffDocByType',
                          options
                        )
                        .then(
                          async data => {
                            loading.dismiss();
                            if (data.response === '0') {
                              (await this.alertCtrl
                                .create({
                                  header: data.response + fileNameWithExtension + " is uploaded successfully.",
                                  buttons: ["Ok"]
                                }))
                              .present();
                            } else {
                              (await this.alertCtrl
                                .create({
                                  header: data.response + " << Something went wrong.",
                                  buttons: ["Ok"]
                                }))
                              .present();
                            }
                          },
                          async (err) => {
                            loading.dismiss();
                            console.log( JSON.stringify(err) );
                            // alert('Error in your pdf file');
                            (await
                              this.alertCtrl.create({
                                header: "Error in uploading your file.",
                                message: JSON.stringify(err),
                                buttons: ["Ok"]
                              })).present();
                          }
                        );
                    } else {
                      (await this.alertCtrl.create({
                        header: 'Document size must be less than 3mb.',
                        buttons: ['Ok']
                      })).present();
                    }
                  });
              });
            })
            .catch(err => {
              alert(JSON.stringify(err));
            });
        })
        .catch(err => {
          alert(JSON.stringify(err));
        });*/
    }
  
  
    //#### MAKE REQUEST FOR ACCESSING USER DETAIL
    getUserDetails(data) {
      const loginData: any = {};
      loginData.user_id = data.id;
      this.authServe.getUserDetails(loginData, "getUserDetails").then(
        result => {
          this.userDetails = this.dashboardProvider.returnResponseByNativeHttp(result); // Array.of(result);
          this.defaultData = this.userDetails["result"][0]["data"][0];
          this.otoCheck = (this.defaultData.oto_accept == '1') ? false : true;
          this.normalRates = (this.defaultData.normal_rate == '1') ? false : true;
          this.commercial = (this.defaultData.commercial_rate == '1') ? false : true;
  
          //#### SET DEFAULT VALUES WHEN OPNE THE PAGE
          this.defaultInfo();
        },
        err => {
          console.log(err);
        }
      );
    }
  
    //#### CHANGE STATUS
    changeStatus = (statusText: string, status: boolean) => {
      console.log('[Change Status invoked]');
      console.log('[Change Status invoked] :: ', status);
  
      if(statusText == 'normalRates') {
        this.normalRates = status;
        this.updateInfo();
      }
  
      if(statusText == 'otoCheck') {
        this.otoCheck = status;
        this.updateInfo();
      }
  
      if(statusText == 'commercial') {
        this.commercial = status;
        this.updateInfo();
      }
    }
  
    //#### INVOKE DEFAULT TO SET WHEN PAGE OPENS
    defaultInfo() {
      console.log(this.defaultData);
  
      //#### NAME
      this.fname = this.defaultData.name;
  
      //#### email
      this.email = this.defaultData.email;
  
      //#### phone
      this.phone = this.defaultData.mobile;
  
      //#### company name
      this.company_name = this.defaultData.company_name;
  
      //#### abn
      this.abn = this.defaultData.abn;
  
      //#### insurance
      if (this.defaultData.is_insurance_expired === 1) {
        console.log('waiting');
        this.insauranceEcpired = true;
      } else if (this.defaultData.is_insurance_expired === 2) {
        this.insauranceEcpired = false;
      }
  
      //#### insaurance
      if (this.defaultData.insurance_expiry !== "0000-00-00") {
        this.insaurance = this.defaultData.insurance_expiry;
      } else {
        this.insaurance = "";
      }
  
      this.dd_check =this.defaultData.document_check;
      console.log(this.dd_check);
  
      //#### bsb
      this.bsb = this.defaultData.bsb;
  
      //#### acc
      this.acc = this.defaultData.account_number;
    }
  
    //#### INVOKE UPDATE INFO WHEN PRESSED
    async updateInfo() {
      //#### THIS WILL RETURN ALL NEW JOBS INTO JSON, TYPO WILL EXTRACT IT
      //#### INVOKE DEFAULT DASHBOARD DATA ON LOAD #ON COMPONENT READY
      let data = JSON.parse(localStorage.getItem("afterLoginData"));
      const dashboardPost: any = {};
      this.isChecked = true;
  
      //#### THIS IS STAFF TYPE BELONGS TO STAFF OR SUB-STAFF
      dashboardPost.staff_type = data.staff_type;
  
      //#### THIS IS STAFF ID
      dashboardPost.staff_id = data.id;
  
      //#### NAME
      dashboardPost.name = await this.checkValueForUpdate(this.fname, "Name");
  
      //#### email
      dashboardPost.email = await this.checkValueForUpdate(this.email, "Email");
  
      //#### phone
      dashboardPost.mobile = await this.checkValueForUpdate(this.phone, "Phone");
  
      //#### company name
      dashboardPost.company_name = await this.checkValueForUpdate(this.company_name, "Company Name");
  
      //#### abn
      dashboardPost.abn = await this.checkValueForUpdate(this.abn, "ABN");
  
      //#### insaurance
      dashboardPost.insurance_expiry = await this.checkValueForUpdate(this.insaurance, "Insaurance date");
  
      //#### bsb
      dashboardPost.bsb = await this.checkValueForUpdate(this.bsb, "BSB");
  
      //#### acc
      dashboardPost.account_number = await this.checkValueForUpdate(this.acc, "Account No.");
  
      // #### OTHER INFO PASSED
      dashboardPost.oto_accept = (this.otoCheck == true) ? "2" : "1";
      dashboardPost.normal_rate = (this.normalRates == true) ? "2" : "1";
      dashboardPost.commercial_rate = (this.commercial == true) ? "2" : "1";
  
      console.log(dashboardPost);
      if (!this.isChecked) {
        return false;
      } else {
        this.callToUpdate(dashboardPost);
      }
    }
  
    //#### CHECK PASSWORD
    verifyNewPassword() {
      if (this.new_pass != undefined && this.conf_pass !== undefined) {
        return this.new_pass === this.conf_pass ? true : false;
      }
    }
  
    //#### INVOKE UPDATE INFOR SERVICE
    async callToUpdate(dashboardPost) {
      if (this.verifyNewPassword()) {
        //#### NEW PASS
        dashboardPost.new_pass = this.new_pass;
  
        //#### CONFIRM PASS
        dashboardPost.conf_pass = this.conf_pass;
      }
  
      let loading = await this.loadingCtrl.create({
        message: "Updating...",
        spinner: "bubbles"
      });
      loading.present();

      console.log("My Detail Page");
      console.log(dashboardPost);
  
      // <ion-spinner name="bubbles"></ion-spinner>
  
      //#### SET THE HTTP REQUEST FROM PROVIDER | SERVICE
      this.dashboardProvider.updateInfo(dashboardPost, "myDetailUpdate").then(
        result => {
          loading.dismiss();
          this.showToastWithCloseButton("Profile updated.");
          this.new_pass = "";
          this.conf_pass = "";
          console.log(result);
        },
        async err => {
          console.log(err);
          loading.dismiss();
          (await this.alertCtrl
            .create({
              header: "Something went wrong!",
              buttons: ["OK"]
            }))
            .present();
        }
      );
    }
  
    async showToastWithCloseButton(messageStr: string) {
      const toast = this.toastCtrl.create({
        message: messageStr,
        // showCloseButton: true,
        // closeButtonText: 'Ok',
        duration: 2000,
      });
      (await toast).present();
    }
  
    //#### FEILD VALUE IS ? :
    async checkValueForUpdate(incomingValue, feildName) {
      console.log("Input > " + feildName + " - " + incomingValue);
      if (incomingValue === "") {
        this.isChecked = false;
        (await this.alertCtrl
          .create({
            header: feildName + " required",
            buttons: ["OK"]
          }))
          .present();
      } else {
        console.log("Output > " + feildName + " - " + incomingValue);
        return incomingValue;
      }
    }
  
    async selectDate() {
      let latest_date = this.datepipe.transform(this.event.month, "yyyy-MM-dd");
      if (this.defaultData.insurance_expiry !== latest_date) {
        this.insaurance = latest_date;
  
        (await this.toastCtrl
          .create({
            message: "Insaurance date is changed",
            duration: 3000,
            position: "middle"
          }))
          .present();
      }
    }

}
