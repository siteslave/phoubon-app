import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { MainPage } from '../main/main';
import { ContactPage } from '../contact/contact';
import { MessagePage } from '../message/message';
import { SettingPage } from '../setting/setting';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
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
    public events: Events
  ) {
    this.tabMain = MainPage;
    this.tabContact = ContactPage;
    this.tabMessage = MessagePage;
    this.tabSetting = SettingPage;

    this.events.subscribe('addNotify', () => {
      this.notifyCount++;
    });
    
  }

}
