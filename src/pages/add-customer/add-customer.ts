import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Customer } from '../../providers/customer';

@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
  providers: [Customer]
})
export class AddCustomerPage {
  firstName: string;
  lastName: string;
  sex: string;
  customerTypeId: string;
  telephone: string;
  email: string;
  token: string;
  sexes: Array<{ id: number, name: string }> = [];
  groups: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer
  ) {
    this.token = localStorage.getItem('token');
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });
  }

  save() {
    let customer: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      sex: this.sex,
      telephone: this.telephone,
      email: this.email,
      customerTypeId: this.customerTypeId
    };

    this.customerProvider.save(this.token, customer)
      .then((res: any) => {
        if (res.ok) {
          // success
        } else {
          // ok=false
          if (res.code === 403) {
            // redirect to login page
          } else {
            console.log(res.error);
          }
        }
      }, (error) => {
        console.log(error);
      });
  }  

  ionViewDidLoad() {
    this.customerProvider.getCustomerTypes(this.token)
      .then((res: any) => {
        if (res.ok) {
          this.groups = res.rows;
        } else {
          console.log(res.error);
        }
      }, (error) => { 
        console.log(error);
       });
  }

}
