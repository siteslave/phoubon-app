import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../../providers/login';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Login]
})
export class LoginPage {
  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: Login
  ) { }

  doLogin() {
    this.loginProvider.doLogin(this.username, this.password)
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
