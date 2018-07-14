import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThankyouPage } from '../thankyou/thankyou';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  public ref:AngularFireList<any>;

  mailId = null;
  question = null;

  constructor(public navCtrl: NavController,  private authProvider: AuthProvider,public afd: AngularFireDatabase, public navParams: NavParams) {
    this.ref = afd.list('/contactProd');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

  submitQuestion(){ 
      this.ref.push({
        dealerId: this.authProvider.currentUser.id,
        submittedDate: Date(),
        mailId: this.mailId,
        question: this.question
      }).then( success => {
        this.navCtrl.setRoot(ThankyouPage);;
      }),error => {
        console.log(error);
      }; 
  }
}
