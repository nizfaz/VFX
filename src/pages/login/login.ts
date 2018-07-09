import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    name: 'user',
    pw: 'user'
  };

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private alertCtrl: AlertController, public navParams: NavParams) {
  }

  loginUser() {
    this.authProvider.login(this.user.name, this.user.pw).then(success => {
      if (success) {
        // Your app login API web service call triggers 
        //setRoot will block displaying back button after login
        this.navCtrl.setRoot(HomePage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Login failed',
          message: 'Please check your credentials',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

}
