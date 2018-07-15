import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AuthProvider } from '../../providers/auth/auth';

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

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, public loading: LoadingController,
    private authProvider: AuthProvider, public userData: UserDataProvider, public navParams: NavParams,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: '',
    });
  
    loader.present().then(() => {
      let userId = parseInt(this.authProvider.currentUser.id);
      // Get a reference to the database service
      this.userRef = this.afd.list('/users', ref => ref.orderByChild('userId').equalTo(userId));
      this.userRef.valueChanges().subscribe(result => this.getUserDetails(result));    
 
      loader.dismiss();
    });
  }

  getUserDetails(data) {
    if(data.length > 0) {
      this.userId = this.authProvider.currentUser.id;
      this.userName = data[0].name;
      this.language = data[0].language;
    }
  }

  updateUserInfo() {
    if(this.userData.key) {
      this.userRef.update(this.userData.key, {
        name: this.userName,
        language: this.language
      }).then( success => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          message: 'User info updated',
          buttons: ['OK']
        });
        alert.present();   
      }, error => {
        console.log(error);
      });
    }
  }
}
