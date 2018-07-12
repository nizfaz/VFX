import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the AddQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-question',
  templateUrl: 'add-question.html',
})
export class AddQuestionPage {

  public questionList:AngularFireList<any>;
  question = { id: '', qn: ''};

  qnId = null;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, public params: NavParams) {
    this.questionList = afd.list('/questions', ref => ref.orderByChild('qnId').limitToLast(1));
    this.questionList.valueChanges().subscribe(result => this.getQnId(result));
    this.question.id = this.params.get('key');
    this.question.qn = this.params.get('qn');
  }

  getQnId(data) {
    if(data.length > 0) {
      this.qnId = data[0].qnId;
    }
  }


  addQuestion(id, qn) {
    if(id) {
      this.questionList.update(id, {
        qn: qn
      }).then( newQuestion => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    } else {
      if(this.qnId == null) {
        this.qnId = 0;
      } else {
        this.qnId += 1;
      }
      this.questionList.push({
        qnId: this.qnId,
        qn: qn
      }).then( newQuestion => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      }); 
      }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuestionPage');
  }

}
