import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the DealerSupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealer-support',
  templateUrl: 'dealer-support.html',
})
export class DealerSupportPage {

  public dealerQuestionList = [];
  public loadedDealerQuestionList = [];
  public dbRef:firebase.database.Reference;

  descending: boolean = false;
  order: number;
  column: string = 'submittedDate';
    
  constructor(public navCtrl: NavController, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: '',
    });
  
    loader.present().then(() => {
      this.dbRef = firebase.database().ref('/contactProd');

      this.dbRef.on('value', dealerQuestionList => {
        let questions = [];
        dealerQuestionList.forEach( question => {
          questions.push(question.val());
          return false;
        });
      
        this.dealerQuestionList = questions;
        this.loadedDealerQuestionList = questions;
      });
      this.sort();
          setTimeout(() => {
          loader.dismiss();
        }, 2000);
    });
  }

  initializeItems(): void {
    this.dealerQuestionList = this.loadedDealerQuestionList;
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
  
    this.dealerQuestionList = this.dealerQuestionList.filter((v) => {
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
