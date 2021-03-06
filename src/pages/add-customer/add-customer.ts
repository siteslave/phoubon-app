import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Customer } from '../../providers/customer';

import { Camera, CameraOptions } from 'ionic-native';

@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
  providers: [Customer]
})
export class AddCustomerPage {
  firstName: string;
  lastName: string;
  sex: string;
  customerTypeId: string;
  telephone: string;
  email: string;
  token: string;
  sexes: Array<{ id: number, name: string }> = [];
  groups: Array<any>;
  myNumber: string;
  base64Image: string;
  imageData: string;
  id: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public alertCtrl: AlertController
  ) {
    this.token = localStorage.getItem('token');
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });

    this.id = this.navParams.get('id');
  }

  takePicture() {
    let options: CameraOptions = {
      quality: 60,
      destinationType: 0,
      sourceType: 1,
      allowEdit: true
    };

    Camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageData = imageData;
      // console.log(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  browsePicture() {
    let options: CameraOptions = {
      quality: 60,
      destinationType: 0,
      sourceType: 0,
      allowEdit: true
    };

    Camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageData = imageData;
      // console.log(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  _doSave() {
  
    let customer: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      sex: this.sex,
      telephone: this.telephone,
      email: this.email,
      customerTypeId: this.customerTypeId,
      image: this.imageData,
      id: this.id
    };

    let promise;
    if (this.id) {
      // update
      promise = this.customerProvider.update(this.token, customer);
    } else {
      // insert
      promise = this.customerProvider.save(this.token, customer);
    }
    
    promise.then((res: any) => {
      if (res.ok) {
        // success
        this.navCtrl.pop();
      } else {
        // ok=false
        if (res.code === 403) {
          // redirect to login page
        } else {
          console.log(res.error);
        }
      }
    }, (error) => {
      console.log(error);
    });
  }  

  save() {

    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'ต้องการบันทึก ใช่หรือไม่?',
      buttons: [
        {
          text: 'ไม่',
          handler: () => {}
        },
        {
          text: 'ใช่',
          handler: () => {
            this._doSave();
          }
        }
      ]
    });
    confirm.present();

  }  

  ionViewDidLoad() {
    this.customerProvider.getCustomerTypes(this.token)
      .then((res: any) => {
        if (res.ok) {
          this.groups = res.rows;
        } else {
          console.log(res.error);
        }
      }, (error) => { 
        console.log(error);
       });
  }

  ionViewWillEnter() {
    if (this.id) {
      this.firstName = this.navParams.get('first_name');
      this.lastName = this.navParams.get('last_name');
      this.sex = this.navParams.get('sex');
      this.customerTypeId = this.navParams.get('customer_type_id');
      this.telephone = this.navParams.get('telephone');
      this.email = this.navParams.get('email');
      this.imageData = this.navParams.get('imageBase64');
      this.base64Image = this.navParams.get('image');
    }
  }

}
