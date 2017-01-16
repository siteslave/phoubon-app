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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    ContactPage,
    MessagePage,
    SettingPage,
    TabsPage
  ],
  imports: [
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
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
