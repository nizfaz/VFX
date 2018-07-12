import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AddQuestionPage } from '../add-question/add-question';

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
}) 
export class QuestionsPage {

  questionsRef: AngularFireList<any>;
  questionList: Observable<any[]>;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {   
    this.questionsRef = afd.list('/questions');
    this.questionList = this.questionsRef.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  addQuestion(){
    this.navCtrl.push(AddQuestionPage);
  }

  editQuestion(question) {
    this.navCtrl.push(AddQuestionPage, {
      key: question.key,
      qn: question.qn
    });    
  }

  deleteQuestion(question) {
    this.questionsRef.remove(question.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

}
