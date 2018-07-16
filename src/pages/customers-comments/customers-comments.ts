import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

/**
 * Generated class for the DealersCommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealers-comments',
  templateUrl: 'customers-comments.html',
})
export class CustomersCommentsPage {
  ref: AngularFireList<any>;
  comments = [];

  public suggestionsList = [];
  public loadedSuggestionsList = [];
  public dbRef:firebase.database.Reference;

  descending: boolean = false;
  order: number;
  column: string = 'feedbackDate';
    
  constructor(public navCtrl: NavController, public loading: LoadingController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: '',
    });
  
    loader.present().then(() => {
      this.dbRef = firebase.database().ref('/feedback');

      this.dbRef.on('value', suggestionsList => {
        let suggestions = [];
        suggestionsList.forEach( suggestion => {
          let suggestionVal = suggestion.child('suggestions').val();
          suggestionVal.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // to avoid displaying empty suggestions
          if(suggestionVal) {
            suggestions.push(suggestion.val());
          }
          return false;
        });
      
        this.suggestionsList = suggestions;
        this.loadedSuggestionsList = suggestions;
      });
      this.sort();
      setTimeout(() => {
        loader.dismiss();
      }, 2000);
  });
  }

  initializeItems(): void {
    this.suggestionsList = this.loadedSuggestionsList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.suggestionsList = this.suggestionsList.filter((v) => {
      if(v.dealerId && q) {
        if (v.dealerId.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  sort(){
    //this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }
}
