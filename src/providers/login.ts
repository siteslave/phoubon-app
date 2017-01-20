import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Login {

  constructor(
    public http: Http,
    @Inject('API_URL') public url: string) {

  }

  doLogin(encryptText) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/users/login`;
      // let url = this.url + '/users/login';
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = { data: encryptText };
      this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, () => {
          reject('Connection failed!');
        });
    });
  }

}
