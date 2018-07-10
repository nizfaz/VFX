import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AddDealerPage } from '../add-dealer/add-dealer';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the DealerUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealer-users',
  templateUrl: 'dealer-users.html',
})
export class DealerUsersPage {

  dealersRef: AngularFireList<any>;
  dealerList: Observable<any[]>;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {
    this.dealersRef = afd.list('/users');
    this.dealerList = this.dealersRef.valueChanges();
  }

  addDealer(){
    this.navCtrl.push(AddDealerPage);
  }

  editDealer(dealer) {
    return this.dealersRef.update(dealer.key, dealer);
  }

  deleteDealer(dealer) {
    this.dealersRef.remove(dealer.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealerUsersPage');
  }

}
