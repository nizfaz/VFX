import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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

  public userRef:AngularFireList<any>;

  keyedId = null;
  keyedPwd = null;

  dbName = null;
  dbPwd = null;
  isAdmin = null;

  firstLogin = true;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, 
    private authProvider: AuthProvider, private toast: ToastController, public navParams: NavParams) {
  }

  loginUser() {
    if(this.keyedId != null && this.keyedPwd != null) {
      if(!isNaN(this.keyedId)) {
        let userId = parseInt(this.keyedId);
        // Get a reference to the database service
        this.userRef = this.afd.list('/users', ref => ref.orderByChild('userId').equalTo(userId));
        this.userRef.valueChanges().subscribe(result => this.getUserDetails(result));      
      } else {
        this.toast.create({
          message: 'Invalid User Id',
          duration: 3000
        }).present();    
      }        
    } else {
      this.toast.create({
        message: 'User Id & Password must be entered',
        duration: 3000
      }).present();    
    } 
  }

  getUserDetails(data) {
    if(data.length > 0) {
      this.dbName = data[0].name;
      this.dbPwd = data[0].password;
      this.isAdmin = data[0].isAdmin;
    }

    if(this.firstLogin) {
      this.authProvider.login(this.keyedPwd, this.keyedId, this.dbName, this.dbPwd, this.isAdmin).then(success => {
        if (success) {
          // Your app login API web service call triggers 
          //setRoot will block displaying back button after login
          this.navCtrl.setRoot(HomePage);
          this.firstLogin = false;
          this.toast.create({
            message: 'Login Successful',
            duration: 3000
          }).present();    
        } else {
          this.toast.create({
            message: 'Login Failed',
            duration: 3000
          }).present();    
        }
      });  
    }
  }
}
