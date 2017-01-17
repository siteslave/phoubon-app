import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Customer {

  constructor(
    public http: Http,
    @Inject('API_URL') public url: string) { }

  getCustomers(token: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers`;
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
}