import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DealerUsersPage } from '../dealer-users/dealer-users';
import { ProdUsersPage } from '../prod-users/prod-users';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DealerUsersPage;
  tab2Root: any = ProdUsersPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

}
