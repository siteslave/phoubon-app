import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  App
} from 'ionic-angular';
import { IUser } from '../../../shared';
import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';

import { Customer } from '../../providers/customer';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [Customer]
})
export class MainPage {
  customers: Array<any> = [];
  // users: Array<any>;
  // users: Array<Object>;
  // users: Array<{ id: number, name: string, telephone: string }>;
  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public loadingCtrl: LoadingController,
    public app: App
  ) {
    this.token = localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  } 
  
  goDetail(user: IUser) {
    let params = {xx: 'xxx', yy: 'yyy', zzz: ['A', 'B', 'C']};
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

    this.customerProvider.getCustomers(this.token)
      .then((data: any) => {
         loading.dismiss();
        if (data.ok) {
          // this.customers = data.rows;
          data.rows.forEach(v => {
            let obj: any = {
              id: v.id,
              first_name: v.first_name,
              last_name: v.last_name,
              email: v.email,
              image: v.image ? 'data:image/jpeg;base64,' + v.image : null
            };
            this.customers.push(obj);
          });
        } else {
          if (data.code === 403) {
            this.logout();
          }
        }
      }, error => {
        console.log(error);
        loading.dismiss();
      });
  }  

  ionViewWillEnter() {
    this.getUsers();
  }



}
