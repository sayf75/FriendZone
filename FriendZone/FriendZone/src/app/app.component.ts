import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { LoginProvider } from '../providers/login/login';

import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;
  loader:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public login: LoginProvider, public loadingCtrl: LoadingController) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.presentLoading();
    this.login.login().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.rootPage = HomePage
      } else {
        this.rootPage = LoginPage;
      }
      this.loader.dismiss();
    });
  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Authentification...",
      duration: 3000
    });
    this.loader.present();
  }

}
