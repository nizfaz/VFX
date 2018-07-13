import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { HomePage } from '../home/home';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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

  keyedId = null;
  keyedPwd = null;

  dbName = null;
  dbPwd = null;
  isAdmin = null;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, private authProvider: AuthProvider, private alertCtrl: AlertController, public navParams: NavParams) {
  }

  loginUser() {
    let userId = parseInt(this.keyedId);
    // Get a reference to the database service
    this.userRef = this.afd.list('/users', ref => ref.orderByChild('userId').equalTo(userId));
    this.userRef.valueChanges().subscribe(result => this.getUserDetails(result));    
  }

  getUserDetails(data) {
    if(data.length > 0) {
      this.dbName = data[0].name;
      this.dbPwd = data[0].password;
      this.isAdmin = data[0].isAdmin;
    }

    this.authProvider.login(this.keyedPwd, this.keyedId, this.dbName, this.dbPwd, this.isAdmin).then(success => {
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
