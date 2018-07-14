import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the AddProdUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-add-prod-user',
  templateUrl: 'add-prod-user.html',
})
export class AddProdUserPage {

  public prodUserList:AngularFireList<any>;
  prodUser = { id: '', name: '', language: ''};
  dbUserId: number;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, public params: NavParams) {
    this.prodUserList = afd.list('/users', ref => ref.orderByChild('userId').limitToLast(1));
    this.prodUserList.valueChanges().subscribe(result => this.getUserDetails(result));    
    this.prodUser.id = this.params.get('key');
    this.prodUser.name = this.params.get('name');
    this.prodUser.language = this.params.get('language');
  }

  getUserDetails(data) {
    if(data.length > 0) {
      this.dbUserId = data[0].userId;
    }
  }

  addProdUser(id, name, language) {
    let newUserId = 500001;
    if(this.dbUserId) {
      newUserId = this.dbUserId + 1;
    }
    if(id) {
      this.prodUserList.update(id, {
        name: name,
        language: language
      }).then( newProdUser => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    } else {
      this.prodUserList.push({
        userId: newUserId,
        name: name,
        language: language,
        isAdmin: 1,
        password: 'volvo123'
      }).then( newProdUser => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      }); 
      }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProdUserPage');
  }

}
