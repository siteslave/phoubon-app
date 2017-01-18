import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Customer } from '../../providers/customer';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [Customer]
})
export class MapPage {
  lat: number = 15.2247057;
  lng: number = 104.8554494;
  zoomLevel: number = 18;
  customerLat: number;
  customerLng: number;
  customerName: string;
  id: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public toastCtrl: ToastController
  ) {
    this.customerName = this.navParams.get('first_name') + ' ' + this.navParams.get('last_name');
    let lat = this.navParams.get('lat');
    let lng = this.navParams.get('lng');
    this.id = this.navParams.get('id');

    if (lat && lng) {
      // marker
      this.customerLat = lat;
      this.customerLng = lng;
      // set center
      this.lat = lat;
      this.lng = lng;
    }
  }

  mapClick(event: any) {
    console.log(event);
    this.customerLat = event.coords.lat;
    this.customerLng = event.coords.lng;
  }

  save() {
    let token = localStorage.getItem('token');
    this.customerProvider.saveMap(token, this.id, this.customerLat, this.customerLng)
      .then((res: any) => {
        if (res.ok) {
          // success
          let toast = this.toastCtrl.create({
            message: 'Map save successfully',
            duration: 3000
          });
          toast.present();
        } else {
          // error
          console.log(res.error);
        }
      }, (error) => {
        // connection error
      });
  }

}
