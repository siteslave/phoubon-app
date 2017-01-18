import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Customer {

  constructor(
    public http: Http,
    @Inject('API_URL') public url: string) { }

  getCustomers(token: string, limit: number, offset: number) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers/${limit}/${offset}`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.get(url, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject('Connection error');
        });
      
    });   
  }

  getTotal(token: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers/total`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.get(url, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject('Connection error');
        });
      
    });   
  }

  getCustomerTypes(token: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers/customer-types`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.get(url, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject('Connection error');
        });
      
    });   
  }

  save(token: string, customer: any) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        first_name: customer.firstName,
        last_name: customer.lastName,
        sex: customer.sex,
        customer_type_id: customer.customerTypeId,
        telephone: customer.telephone,
        email: customer.email
      }
      this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject('Connection error');
        });
      
    });   
  }
}
