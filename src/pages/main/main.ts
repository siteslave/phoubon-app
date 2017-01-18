import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ActionSheetController,
  App,
  Events,
  Platform
} from 'ionic-angular';
import { IUser } from '../../../shared';
import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';
import { AddCustomerPage } from '../add-customer/add-customer';

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
  total: number = 0;
  startRecord: number = 0;
  perPage: number = 6;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public loadingCtrl: LoadingController,
    public app: App,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform
  ) {
    this.token = localStorage.getItem('token');
  }

  logout() {
    this.events.publish('logout');
  } 

  addNotify() {
    this.events.publish('addNotify');
  }

  add() {
    this.navCtrl.push(AddCustomerPage);
  }
  
  presentActionSheet(customer: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action menu',
      buttons: [
        {
          text: 'ลบข้อมูล',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash': null,
          handler: () => { 
            console.log(customer);
            this.customerProvider.remove(this.token, customer.id)
              .then((res: any) => {
                if (res.ok) {
                  this.getUsers();
                }
               }, (error) => { });
          }
        },
        {
          text: 'แก้ไข',
          icon: !this.platform.is('ios') ? 'create': null,
          handler: () => {

          }
        },
        {
          text: 'ดู/กำหนด แผนที่',
          icon: !this.platform.is('ios') ? 'map': null,
          handler: () => { 
            this.navCtrl.push(MapPage, customer);
          }
        },
        {
          text: 'โทร',
          icon: !this.platform.is('ios') ? 'call': null,
          handler: () => {

          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close': null,
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
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

    this.customers = [];
    
    let limit = this.perPage;
    let offset = 0;

    this.customerProvider.getCustomers(this.token, limit, offset)
      .then((data: any) => {
        loading.dismiss();
        if (data.ok) {
          // this.customers = data.rows;
          data.rows.forEach(v => {
            let obj: any = {
              id: v.id,
              lat: v.lat,
              lng: v.lng,
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
          } else {
            console.log(data.error);
          }
        }
      }, error => {
        console.log(error);
        loading.dismiss();
      });
  }  

  ionViewWillEnter() {
    this.customerProvider.getTotal(this.token)
      .then((res: any) => {
        this.total = res.total;
        this.getUsers();
      });
  }

  doInfinite(infiniteScroll) {
    if (this.startRecord <= this.total) {
      this.startRecord += this.perPage;

      let limit = this.perPage;
      let offset = this.startRecord;

      this.customerProvider.getCustomers(this.token, limit, offset)
        .then((data: any) => {
          infiniteScroll.complete();
          if (data.ok) {
            // this.customers = data.rows;
            data.rows.forEach(v => {
              let obj: any = {
                id: v.id,
                lat: v.lat,
                lng: v.lng,
                first_name: v.first_name,
                last_name: v.last_name,
                email: v.email,
                image: v.image ? 'data:image/jpeg;base64,' + v.image : null
              };
              this.customers.push(obj);
            });
          } else {
            infiniteScroll.complete();
            if (data.code === 403) {
              this.logout();
            } else {
              console.log(data.error);
            }
          }
        }, error => {
          infiniteScroll.complete();
          console.log(error);
        });
      
    } else {
      infiniteScroll.complete();
    }
  }
}
