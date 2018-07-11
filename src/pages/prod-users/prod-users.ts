import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddProdUserPage } from '../add-prod-user/add-prod-user';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the ProdUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prod-users',
  templateUrl: 'prod-users.html',
})
export class ProdUsersPage {

  prodUsersRef: AngularFireList<any>;
  prodUserList: Observable<any[]>;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {
    this.prodUsersRef = afd.list('/users', ref => ref.orderByChild('isAdmin').equalTo(1));
    this.prodUserList = this.prodUsersRef.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  addProdUser(){
    this.navCtrl.push(AddProdUserPage);
  }

  editProdUser(prodUser) {
    this.navCtrl.push(AddProdUserPage, {
      key: prodUser.key,
      name: prodUser.name,
      language: prodUser.language
    });    
  }

  deleteProdUser(prodUser) {
    this.prodUsersRef.remove(prodUser.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdUsersPage');
  }

}
