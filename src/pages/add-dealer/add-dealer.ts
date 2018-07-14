import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  dealer = { id: '', name: '', language: ''};
  dbUserId: number;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, public params: NavParams) {
    this.dealerList = afd.list('/users', ref => ref.orderByChild('userId').limitToLast(1));
    this.dealerList.valueChanges().subscribe(result => this.getUserDetails(result));    
    this.dealer.id = this.params.get('key');
    this.dealer.name = this.params.get('name');
    this.dealer.language = this.params.get('language');
  }

  getUserDetails(data) {
    if(data.length > 0) {
      this.dbUserId = data[0].userId;
    }
  }

  addDealer(id, name, language) {
    let newUserId = 100001;
    if(this.dbUserId) {
      newUserId = this.dbUserId + 1;
    }
    if(id) {
      this.dealerList.update(id, {
        name: name,
        language: language
      }).then( newDealer => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    } else {
      this.dealerList.push({
        userId: newUserId,
        name: name,
        language: language,
        isAdmin: 0,
        password: 'volvo123'
      }).then( newDealer => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      }); 
      }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDealerPage');
  }

}
