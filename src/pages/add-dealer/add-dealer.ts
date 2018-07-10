import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the AddDealerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-dealer',
  templateUrl: 'add-dealer.html',
})
export class AddDealerPage {

  public dealerList:AngularFireList<any>;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {
    this.dealerList = afd.list('/users');
  }

  addDealer(name, language) {
    this.dealerList.push({
      name: name,
      language: language,
      isAdmin: 0,
      password: ''
    }).then( newDealer => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDealerPage');
  }

}
