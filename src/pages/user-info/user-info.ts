import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserDataProvider } from '../../providers/user-data/user-data';

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  public userRef:AngularFireList<any>;

  userId = null;
  userName = null;
  language = null;

  constructor(public navCtrl: NavController, public userData: UserDataProvider, public navParams: NavParams) {
    this.userRef = this.userData.userDBRef;
    this.userId = this.userData.userId;
    this.userName = this.userData.userName
    this.language = this.userData.language;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }

}
