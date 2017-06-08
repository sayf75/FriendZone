import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  registerPage = RegisterPage;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
  }

  registerpage() {
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage');
  }
}
