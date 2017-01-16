import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../../shared';

interface IUser2 extends IUser {
  email?: string
}
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  user: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.data;
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
