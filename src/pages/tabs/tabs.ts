import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { MainPage } from '../main/main';
import { ContactPage } from '../contact/contact';
import { MessagePage } from '../message/message';
import { SettingPage } from '../setting/setting';

import { User } from '../../providers/user';

import { Push } from 'ionic-native';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [User]
})
export class TabsPage {
  tabMain: any;
  tabContact: any;
  tabMessage: any;
  tabSetting: any;
  notifyCount: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public userProvider: User
  ) {
    this.tabMain = MainPage;
    this.tabContact = ContactPage;
    this.tabMessage = MessagePage;
    this.tabSetting = SettingPage;

    this.events.subscribe('addNotify', () => {
      this.notifyCount++;
    });

  }

  ionViewWillEnter() {
    var push = Push.init({
      android: {
        senderID: '1030554958328'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    });

    push.on('registration', (data) => {
      console.log(data.registrationId);
      let token = localStorage.getItem('token');

      this.userProvider.saveDeviceToken(token, data.registrationId)
        .then((res: any) => {
          console.log('Register device token success!');
        }, (error) => {
          console.log(error);
        });
    });

    push.on('notification', (data) => {
      // this.events.publish('addNotify');
      this.notifyCount++;
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);
    });

    push.on('error', (e) => {
      console.log(e.message);
    });

  }

}
