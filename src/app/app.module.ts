import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { MainPage } from '../pages/main/main';
import { MapPage } from '../pages/map/map';

import { ContactPage } from '../pages/contact/contact';
import { MessagePage } from '../pages/message/message';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AddCustomerPage } from '../pages/add-customer/add-customer';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    ContactPage,
    MessagePage,
    SettingPage,
    TabsPage,
    LoginPage,
    AddCustomerPage
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAVLBNFbC7sKFsfo9D0XGuF2vGnSrl9xtE'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    ContactPage,
    MessagePage,
    SettingPage,
    TabsPage,
    LoginPage,
    AddCustomerPage
  ],
  providers: [
    { provide: 'API_URL', useValue: 'http://192.168.43.224:3000' },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
