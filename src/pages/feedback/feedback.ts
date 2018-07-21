import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ThankyouPage } from '../thankyou/thankyou';
import { Observable } from '../../../node_modules/rxjs';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const STORAGE_KEY = 'feedbacks';
//const QUESTIONS_STORAGE_KEY = "Questions";

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  responsesCount:number = 0;
  feedback = {};
  responses = {};
  scale: any;
  suggestions : any;
  public feedbackList:AngularFireList<any>;
  public questionsRef:AngularFireList<any>;
  questionsList: Observable<any>; 
  questions;
  cachedQuestions;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, 
    private authProvider: AuthProvider, public afd: AngularFireDatabase, 
    public loading: LoadingController, public navParams: NavParams, 
    private network: Network, public storage: Storage) {
  }

  @ViewChild('pager') slider: Slides;

  ionViewDidLoad() {
      let loader = this.loading.create({
        content: '',
      });

      loader.present().then(() => {
        this.feedbackList = this.afd.list('/feedback');

        this.questionsRef = this.afd.list('/questions');

        // this.storage.remove(QUESTIONS_STORAGE_KEY);             
        // this.questionsRef.valueChanges().subscribe(result => {
        //   this.cacheQuestions(result);
        //   })
            
        //   this.getLocallyStoredQuestions().then(qns => {
        //     if(qns) {
        //       this.cachedQuestions = qns;
        //     }
        //   })
      
        this.questionsList = this.questionsRef.snapshotChanges().map(
          changes => {
            return changes.map(c => ({
              key: c.payload.key, ...c.payload.val()
          }))
          });
  
          setTimeout(() => {
            loader.dismiss();
          }, 2000);

        this.questionsRef.snapshotChanges().map(list=>list.length).subscribe(length=>this.responsesCount=length);
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
    if(this.responsesCount ==  Object.keys(this.responses).length) {
      if(typeof this.suggestions == 'undefined'){
        this.suggestions = "";
      }

      if(this.network.type === 'none') {
        console.log('you are offline');
        this.feedback = [
          {
            "dealerId" : this.authProvider.currentUser.id,
            "feedbackDate" : Date(),
            "suggestions" : this.suggestions,
            "responses" : this.responses
          }
        ]    

        this.getLocallyStoredFeedbacks(this.authProvider.currentUser.id).then(result => {
          let storageKey = STORAGE_KEY + "_" + this.authProvider.currentUser.id
          if (result) {
            result.push(this.feedback);
            return this.storage.set(storageKey, result);
          } else {
            return this.storage.set(storageKey, [this.feedback]);
          }
        }).then( success => {
          this.navCtrl.setRoot(ThankyouPage);;
        }),error => {
          console.log(error);
        };
      } else {
        console.log('you are online');
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
      }

      // let connectSub = this.network.onConnect().subscribe(()=> {
      // });

      // let disconnectSub = this.network.onDisconnect().subscribe(() => {
      // });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Answers required',
        message: 'Please answer all the questions',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  // cacheQuestions(result) {
  //   this.getLocallyStoredQuestions().then(cache => {
  //     if (cache) {
  //       cache.push(result);
  //       this.storage.set(QUESTIONS_STORAGE_KEY, cache);
  //     } else {
  //       this.storage.set(QUESTIONS_STORAGE_KEY, [result]);
  //     }
  //   })
  // }

  // getLocallyStoredQuestions() {
  //   return this.storage.get(QUESTIONS_STORAGE_KEY);
  // }

  getLocallyStoredFeedbacks(dealerId) {
    return this.storage.get(STORAGE_KEY  + "_" + dealerId);
  }
}
