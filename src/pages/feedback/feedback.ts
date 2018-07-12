import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase, AngularFireList, DatabaseReference } from 'angularfire2/database';
import { ServerValue, Query, DataSnapshot } from '../../../node_modules/@firebase/database';
import { ThankyouPage } from '../thankyou/thankyou';
import { FirebaseDatabase } from '../../../node_modules/@firebase/database-types';
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

  constructor(public navCtrl: NavController, private authProvider: AuthProvider,public afd: AngularFireDatabase, public navParams: NavParams) {
    this.feedbackList = afd.list('/feedback');

    this.questionsRef = this.afd.list('/questions');
    this.questionsList = this.questionsRef.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  @ViewChild('pager') slider: Slides;

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
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

    this.questionsList.subscribe(competitor => console.log(competitor));
    
  }


  slides = [
    {
      title: "Question 1",
      description: "Quality of the vehicles based on the initial inspection",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "Question 2",
      description: "On time delivery of the vehicle",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "Question 3",
      description: "Availability of right people to answer questions",
      image: "assets/img/ica-slidebox-img-3.png",
    },
    {
      title: "Question 4",
      description: "Explanation of different features of the bus",
      image: "assets/img/ica-slidebox-img-3.png",
    },
    {
      title: "Question 5",
      description: "Overall experience with Volvo",
      image: "assets/img/ica-slidebox-img-3.png",
    },
    {
      title: "Question 6",
      description: "Any improvement suggestions",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];

}
