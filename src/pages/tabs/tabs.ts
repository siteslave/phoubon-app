import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabMain = MainPage;
    this.tabContact = ContactPage;
    this.tabMessage = MessagePage;
    this.tabSetting = SettingPage;
  }

}
