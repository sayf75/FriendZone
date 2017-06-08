import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  loading:any;

  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.showloader();

    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });
  }

  login() {
    this.showloader();

    let credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage)
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }


  launchSignup(){
      this.navCtrl.push(SignupPage);
  }

  showloader(){
    this.loading = this.loadCtrl.create({
      content: 'Authentication....'
    });

    this.loading.present();
  }

}
