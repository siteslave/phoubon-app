import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../providers/user';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  providers: [User]
})
export class MessagePage {
  userId: number;
  message: string;
  users: Array<any>;
  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: User,
    public toastCtrl: ToastController
  ) {
    this.token = localStorage.getItem('token');
  }

  ionViewWillEnter() {
    this.userProvider.getUsers(this.token)
      .then((res: any) => {
        this.users = res.rows;
      }, (error) => { })
  }

  sendMessage() {
    this.userProvider.sendMessage(this.token, this.userId, this.message)
      .then((res: any) => {
        if (res.ok) {
          let toast = this.toastCtrl.create({
            message: 'ส่งข้อความสำเร็จ',
            duration: 3000
          });
          toast.present();
        } else {
          let toast = this.toastCtrl.create({
            message: 'เกิดข้อผิดพลาด',
            duration: 3000
          });
          toast.present();
        }
      }, (error) => {
          let toast = this.toastCtrl.create({
            message: 'เกิดข้อผิดพลาด',
            duration: 3000
          });
          toast.present();
      });
  }

}
