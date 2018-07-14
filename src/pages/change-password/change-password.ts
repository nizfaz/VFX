import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  public userRef:AngularFireList<any>;
  keyedId = null;

  currentPassword = null;
  newPassword = null;
  confirmPassword = null;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, 
    public afd: AngularFireDatabase, public userData: UserDataProvider, 
    private alertCtrl: AlertController, private appCtrl: App) {
    this.userRef = this.userData.userDBRef;
  }

  changePassword() {
    let dbPassword = this.userData.password;
    if (this.userData.password === this.currentPassword) {
      if(this.newPassword === this.confirmPassword) {
        if(this.userData.key) {
          this.userRef.update(this.userData.key, {
            password: this.newPassword
          }).then( success => {
            let alert = this.alertCtrl.create({
              title: 'Success',
              message: 'Password changed',
              buttons: ['OK']
            });
            alert.present();   
            this.authProvider.logout();
            this.appCtrl.getRootNav().setRoot(LoginPage);
          }, error => {
            console.log(error);
          });
        } 
      } else {

      }
    } else {

    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

}
