import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { IUser } from '../../../shared';
import { MapPage } from '../map/map';

import { User } from '../../providers/user';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [User]
})
export class MainPage {
  users: Array<any> = [];
  // users: Array<any>;
  // users: Array<Object>;
  // users: Array<{ id: number, name: string, telephone: string }>;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: User,
    public loadingCtrl: LoadingController
  ) {

  }

  goDetail(user: IUser) {
    this.navCtrl.push(MapPage, user);
  } 
  
  ionViewDidLoad() {
    // console.log('ionViewDidLoad MainPage');
  }

  getUsers() {
    let loading = this.loadingCtrl.create({
      content: 'รอซักครู่...',
      spinner: 'dots'
    });
    loading.present();

    this.userProvider.getUsers()
      .then((data: any) => {
        loading.dismiss();
        this.users = data.results;
      }, error => {
        loading.dismiss();
      });
  }  

  ionViewWillEnter() {
    this.getUsers();
  }



}
