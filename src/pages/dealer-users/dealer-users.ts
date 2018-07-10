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
    this.dealerList = this.dealersRef.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  addDealer(){
    this.navCtrl.push(AddDealerPage);
  }

  editDealer(dealer) {
    this.navCtrl.push(AddDealerPage, {
      key: dealer.key,
      name: dealer.name,
      language: dealer.language
    });    
  }

  deleteDealer(dealer) {
    this.dealersRef.remove(dealer.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealerUsersPage');
  }

}
