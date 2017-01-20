import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../../providers/login';
import { Encrypt } from '../../providers/encrypt';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Login, Encrypt]
})
export class LoginPage {
  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: Login,
    public encryptProvider: Encrypt
  ) { }

  doLogin() {
    let user: any = {
      username: this.username,
      password: this.password
    };
    let encryptText = this.encryptProvider.encrypt(JSON.stringify(user));
    this.loginProvider.doLogin(encryptText)
      .then((res: any) => {
        if (res.ok) {
          let token = res.token;
          localStorage.setItem('token', token);
          this.navCtrl.setRoot(TabsPage);
        } else {
          alert(JSON.stringify(res.error));
        }
      }, (error) => {
        alert(error);
      });
  }  

}
