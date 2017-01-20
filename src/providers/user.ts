import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class User {

  constructor(
    public http: Http,
    @Inject('API_URL') public url: string) {

  }

  // getUsers() {
  //   return new Promise((resolve, reject) => {
  //     let url = `https://randomuser.me/api?results=10`;
  //     this.http.get(url)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         resolve(data);
  //       }, error => {
  //         reject(error);
  //       });
  //   });
  // }

  saveDeviceToken(token: string, deviceToken: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers/save-device-token`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = { deviceToken: deviceToken };

      this.http.post(url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject('Connection error');
        });

    });
  }

  getUsers(token: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers/users-list`;
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

  sendMessage(token: string, id: number, message: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers/send-message`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = { id: id, msg: message };

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
