import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ServerValue } from '../../../node_modules/@firebase/database';
import { ThankyouPage } from '../thankyou/thankyou';
import { Observable } from '../../../node_modules/rxjs';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  feedback = {};
  responses = {};
  scale: any;
  suggestions : any;
  public feedbackList:AngularFireList<any>;
  public questionsRef:AngularFireList<any>;
  questionsList: Observable<any>;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, 
    private authProvider: AuthProvider, public afd: AngularFireDatabase, 
    public loading: LoadingController, public navParams: NavParams) {
  }

  @ViewChild('pager') slider: Slides;

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: '',
    });
  
    loader.present().then(() => {
      this.feedbackList = this.afd.list('/feedback');

      this.questionsRef = this.afd.list('/questions');
      this.questionsList = this.questionsRef.snapshotChanges().map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))        
        });
        loader.dismiss();
    });
    }


  resSelected(index, value){
    this.responses[index] = {
      "questionId" : index,
      "response" : value
    }
    this.slider.slideNext();
    this.scale = null;
  }

  submitFeedback(){
    if(this.responses) { // TODO: Validation should be done for all the questions
      if(typeof this.suggestions == 'undefined'){
        this.suggestions = "";
      }
  
      this.feedbackList.push({
        dealerId: this.authProvider.currentUser.id,
        feedbackDate: Date(),
        suggestions: this.suggestions,
        responses: this.responses
      }).then( success => {
        this.navCtrl.setRoot(ThankyouPage);;
      }),error => {
        console.log(error);
      };  
    } else {
      let alert = this.alertCtrl.create({
        title: 'Answers required',
        message: 'Please answer all the questions',
        buttons: ['OK']
      });
      alert.present();  
    }
  }
}
