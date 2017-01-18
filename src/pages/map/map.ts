import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Customer } from '../../providers/customer';
import {
  Geolocation,
  LaunchNavigator,
  LaunchNavigatorOptions
} from 'ionic-native';

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
  positions: Array<{ lat: number, lng: number }> = [];
  currentLat: number;
  currentLng: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    this.customerName = this.navParams.get('first_name') + ' ' + this.navParams.get('last_name');
    let lat = this.navParams.get('lat');
    let lng = this.navParams.get('lng');
    this.id = this.navParams.get('id');

    if (lat && lng) {
      // marker
      this.customerLat = lat;
      this.customerLng = lng;
      // this.positions.push({ lat: lat, lng: lng });
      // this.positions.push({ lat: 15.22568238416632, lng: 104.85655725002289 });
      // this.positions.push({ lat: 15.225097481690613, lng: 104.85702395439148 });

      // set center
      this.lat = lat;
      this.lng = lng;
    } else {
      Geolocation.getCurrentPosition().then((resp) => {
        console.log(resp);
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'dots'
    });
    loader.present();
    Geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude;
      this.currentLng = resp.coords.longitude;
      loader.dismiss();
    }).catch((error) => {
      loader.dismiss();
      console.log('Error getting location', error);
    });
  }

  launchNavigator() {
    console.log(this.currentLat);
    console.log(this.currentLng);

    let options: LaunchNavigatorOptions = {
      start: [this.currentLat, this.currentLng]
    };

    LaunchNavigator.navigate([this.customerLat, this.customerLng], options)
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
      );
  }
  
  getCurrentLocation() {
    Geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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
