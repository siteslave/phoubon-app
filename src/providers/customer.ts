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

  search(token: string, query: string) {
    return new Promise((resolve, reject) => {
    let url = `${this.url}/customers/search`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = { query: query };

      this.http.post(url, body, options)
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

  remove(token: string, id: string) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers/${id}`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.delete(url, options)
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
        email: customer.email,
        image: customer.image
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

  update(token: string, customer: any) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        id: customer.id,
        first_name: customer.firstName,
        last_name: customer.lastName,
        sex: customer.sex,
        customer_type_id: customer.customerTypeId,
        telephone: customer.telephone,
        email: customer.email,
        image: customer.image
      }
      this.http.put(url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject('Connection error');
        });
      
    });   
  }

  saveMap(token: string, id: number, lat: number, lng: number) {
    return new Promise((resolve, reject) => {
      let url = `${this.url}/customers/map/${id}`;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        lat: lat,
        lng: lng
      }
      this.http.put(url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject('Connection error');
        });
      
    });   
  }
}
