import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the DealersCommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealers-comments',
  templateUrl: 'dealers-comments.html',
})
export class DealersCommentsPage {
  ref: AngularFireList<any>;
  comments = [];

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // Reference to our Firebase List
    this.ref = this.db.list('feedback', ref => ref.orderByChild('feedbackDate'));
    this.ref.valueChanges().subscribe(result => {      
      this.createFilteredCommentList(result);
      })
  }

  createFilteredCommentList(data) {
    let commentList = data;    
    for (let trans of commentList) {
      let comment = trans.suggestions;
      comment = comment.replace(/^\s\s*/, '').replace(/\s\s*$/, '')      
      if(comment) {
        this.comments.push(comment);
      }
    }
  }
}
