import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ServerValue } from '../../../node_modules/@firebase/database';
import { ThankyouPage } from '../thankyou/thankyou';
import { Observable } from '../../../node_modules/rxjs';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  feedback = {};
  responses = {};
  scale: any;
  suggestions : any;
  public feedbackList:AngularFireList<any>;
  public questionsRef:AngularFireList<any>;
  questionsList: Observable<any>;

  constructor(public navCtrl: NavController,   private authProvider: AuthProvider,public afd: AngularFireDatabase, public navParams: NavParams) {
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
    console.log('ionViewDidLoad SettingsPage');
  }
  changePassword(){
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
  //  matchOtherValidator(otherControlName: string): ValidatorFn {
  //     return (control: AbstractControl): { [key: string]: any } => {
  //         const otherControl: AbstractControl = control.root.get(otherControlName);
  
  //         if (otherControl) {
  //             const subscription: Subscription = otherControl
  //                 .valueChanges
  //                 .subscribe(() => {
  //                     control.updateValueAndValidity();
  //                     subscription.unsubscribe();
  //                 });
  //         }
  
  //         return (otherControl && control.value !== otherControl.value) ? {match: true} : null;
  //     };
  // }
 