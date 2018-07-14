import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThankyouPage } from '../thankyou/thankyou';
import { Observable } from 'rxjs';
import { ServerValue } from '@firebase/database';
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
  feedback = {};
  responses = {};
  scale: any;
  suggestions : any;
  public feedbackList:AngularFireList<any>;
  public questionsRef:AngularFireList<any>;
  questionsList: Observable<any>;
  // constructor(public navCtrl: NavController, public navParams: NavParams,private authProvider: AuthProvider,public afd: AngularFireDatabase,) {
  // }
  constructor(public navCtrl: NavController,  private authProvider: AuthProvider,public afd: AngularFireDatabase, public navParams: NavParams) {
    this.feedbackList = afd.list('/feedback');

    this.questionsRef = this.afd.list('/questions');
    this.questionsList = this.questionsRef.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))        
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

  submitFeedback(){
    if(this.responses) { // TODO: Validation should be done for all the questions
      if(typeof this.suggestions == 'undefined'){
        this.suggestions = "";
      }
  
      this.feedbackList.push({
        dealerName: this.authProvider.currentUser.name,
        feedbackDate: ServerValue.TIMESTAMP,
        suggestions: this.suggestions,
        responses: this.responses
      }).then( newProdUser => {
        this.navCtrl.setRoot(ThankyouPage);;
      }),error => {
        console.log(error);
      }; 
      this.questionsList.subscribe(competitor => console.log(competitor))  
}
  }
}
