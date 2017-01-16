import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {IUser, iGroups, Hello} from '../../../shared';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  // template: `<h1>Hello world</h1>`
})
export class HomePage {

  public age: any;
  fullname: string;
  isSuccess: boolean;
  name: string = 'Ionic Framework 2';
  groups: Array<iGroups>
  users: Array<IUser>;

  constructor(public navCtrl: NavController) {
    this.groups = [{ id: 29, name: 'xx', rights: ['xxx', 'xxx'] }];
    this.users = [
      { id: 1, name: 'Steve Job', telephone: '1234567890' },
      { id: 2, name: 'John Doe', telephone: '909090' },
      { id: 3, name: 'Bill Gate', telephone: '90909090' },
    ];

    this.age = '20';
    this.age = 20;

    // this.fullname = 20;
    this.fullname = 'Hello';
    // this.fullname = true;

    let fullname = this.getName(20);
    console.log(fullname);
  }

  callPhone(telephone: string) {
    alert(telephone);
  }  
  
  getName(id: number): string {
    let hello = new Hello();
    let fullname = hello.getName();
    return fullname;
  }

}



