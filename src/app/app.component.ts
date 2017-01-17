import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  
  constructor(platform: Platform, private alertCtrl: AlertController) {
    let that = this;
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      platform.registerBackButtonAction(() => {
        let confirm = that.alertCtrl.create({
          title: 'Exit app?',
          message: 'คุณต้องการออกจากแอพลิเคชัน ใช่หรือไม่?',
          buttons: [
            {
              text: 'ไม่ใช่',
              handler: () => {
                // console.log('Disagree clicked');
              }
            },
            {
              text: 'ใช่',
              handler: () => {
                platform.exitApp();
              }
            }
          ]
        });
        confirm.present();
      });      


      let token = localStorage.getItem('token');
      if (token) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }

    });
  }
}
