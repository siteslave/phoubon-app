import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../../shared';

interface IUser2 extends IUser {
  email: string
}
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  user: any;
  user2: IUser2;
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.data;
    this.user2 = this.navParams.data;

    this.name = this.navParams.get('id');
    let yyy = this.navParams.get('yy');
    // this.user = {
    //   id: this.navParams.get('id'),
    //   name: this.navParams.get('name'),
    //   telephone: this.navParams.get('telephone')
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
