import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ServerValue } from '../../../node_modules/@firebase/database';
import { ThankyouPage } from '../thankyou/thankyou';
import { Observable } from '../../../node_modules/rxjs';
import { UserInfoPage } from '../user-info/user-info';
import { ChangePasswordPage } from '../change-password/change-password';
import { UserDataProvider } from '../../providers/user-data/user-data';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public userRef:AngularFireList<any>;
  keyedId = null;

  dbName = null;
  dbPwd = null;
  language = null;

  tab1Root: any = UserInfoPage;
  tab2Root: any = ChangePasswordPage;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase
    , private authProvider: AuthProvider, public userData: UserDataProvider) {
    let userId = parseInt(authProvider.currentUser.id);
    // Get a reference to the database service
    this.userRef = this.afd.list('/users', ref => ref.orderByChild('userId').equalTo(userId));
    this.userRef.snapshotChanges().subscribe(result => this.userData.key = result[0].key);    
    this.userRef.valueChanges().subscribe(result => this.getUserDetails(result));    
    this.userData.userDBRef = this.userRef;
  }

  getUserDetails(data) {
    if(data.length > 0) {
      this.userData.userName = data[0].name;
      this.userData.password = data[0].password;
      this.userData.language = data[0].language;
    }
  }

} 