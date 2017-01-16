import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class User {

  constructor(public http: Http) {
    
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      let url = `https://randomuser.me/api?results=10`;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
