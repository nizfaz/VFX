import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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

  dbName = null;
  dbPwd = null;
  language = null;

  tab1Root: any = UserInfoPage;
  tab2Root: any = ChangePasswordPage;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase,
    private authProvider: AuthProvider, public userData: UserDataProvider) {
    let userId = parseInt(authProvider.currentUser.id);
    // Get a reference to the database service
    this.userRef = this.afd.list('/users', ref => ref.orderByChild('userId').equalTo(userId));
    this.userRef.valueChanges().subscribe(result => this.getUserDetails(result));    
    this.userRef.snapshotChanges().subscribe(result => this.userData.key = result[0].key);    
    this.userData.userDBRef = this.userRef;
  }

  getUserDetails(data) {
    if(data.length > 0) {
      this.userData.userId = this.authProvider.currentUser.id;
      this.userData.userName = data[0].name;
      this.userData.password = data[0].password;
      this.userData.language = data[0].language;
    }
  }

} 