import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

/**
 * Generated class for the WordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-words',
  templateUrl: 'words.html',
})
export class WordsPage {

  ref: AngularFireList<any>;
  comments = [];

  public suggestionsList = [];
  public loadedSuggestionsList = [];
  public dbRef:firebase.database.Reference;

  descending: boolean = false;
  order: number;
  column: string = 'feedbackDate';

  suggestionsString = " ";

  wordsCount = new Map();
  sortedMap;
  wordsArray = {
    0: {word: null, color: null, size: null},
    1: {word: null, color: null, size: null},
    2: {word: null, color: null, size: null},
    3: {word: null, color: null, size: null},
    4: {word: null, color: null, size: null},
    5: {word: null, color: null, size: null},
    6: {word: null, color: null, size: null},
    7: {word: null, color: null, size: null},
    8: {word: null, color: null, size: null},
    9: {word: null, color: null, size: null}
  };
    
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
            this.suggestionsString = this.suggestionsString + suggestionVal + " ";
          }
          return false;
        });

        let str_array = this.suggestionsString.split(" ");
        for(var i = 0; i < str_array.length; i++) {
          if(str_array[i] !== "") {
            if(this.wordsCount.get(str_array[i])) {
              let count = this.wordsCount.get(str_array[i]) + 1;
              this.wordsCount.set(str_array[i], count);
            } else {
              this.wordsCount.set(str_array[i], 1);
            }  
          }
        }

        this.wordsCount[Symbol.iterator] = function* () {
          yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
        }

        this.sortedMap = [...this.wordsCount];
         
        var i = 0;
        for(let value of this.sortedMap.values()) {
          this.wordsArray[i]["word"] = value[0];
          this.wordsArray[i]["color"] = this.randomColor();
          this.wordsArray[i]["size"] = Math.floor(Math.random() * (13 - 6 + 1)) + 6;
          i++;
        }            
      });
      setTimeout(() => {
        loader.dismiss();
      }, 2000);
  });
  }

  randomColor() {
    var color;
    color = Math.floor(Math.random() * 0x1000000); // integer between 0x0 and 0xFFFFFF
    color = color.toString(16);                    // convert to hex
    color = ("000000" + color).slice(-6);          // pad with leading zeros
    color = "#" + color;                           // prepend #
    return color;
  }
}
