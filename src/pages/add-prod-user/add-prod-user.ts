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

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, public params: NavParams) {
    this.prodUserList = afd.list('/users');
    this.prodUser.id = this.params.get('key');
    this.prodUser.name = this.params.get('name');
    this.prodUser.language = this.params.get('language');
  }

  addProdUser(id, name, language) {
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
        name: name,
        language: language,
        isAdmin: 1,
        password: ''
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
