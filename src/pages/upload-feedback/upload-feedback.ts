import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireList, AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { ThankyouPage } from '../thankyou/thankyou';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the UploadFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const STORAGE_KEY = 'feedbacks';

@IonicPage()
@Component({
  selector: 'page-upload-feedback',
  templateUrl: 'upload-feedback.html',
})
export class UploadFeedbackPage {

  public feedbackList:AngularFireList<any>;
  public offlineFeedbacks;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private authProvider: AuthProvider, public loading: LoadingController,
    public afd: AngularFireDatabase, public storage: Storage) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: '',
    });
  
    loader.present().then(() => {
      this.feedbackList = this.afd.list('/feedback'); 
      this.getLocallyStoredFeedbacks(this.authProvider.currentUser.id).then(result => {
        if(result != null) {
          this.offlineFeedbacks = result.length;
        } else {
          this.offlineFeedbacks = 0;
        }
      });               
      setTimeout(() => {
        loader.dismiss();
      }, 2000);
    });
  }

  uploadFeedback() {
    this.getLocallyStoredFeedbacks(this.authProvider.currentUser.id).then(result => {
      let i = 0
      for (let data of result) {
        this.feedbackList.push({
          dealerId: data[i].dealerId,
          feedbackDate: data[i].feedbackDate,
          suggestions: data[i].suggestions,
          responses: data[i].responses
        }),error => {
          console.log(error);
        };
        i++;  
      }
    }).then( success => {
      this.removeLocalStorageItem(this.authProvider.currentUser.id);
      this.navCtrl.setRoot(ThankyouPage);;
    }),error => {
      console.log(error);
    };
  }

  getLocallyStoredFeedbacks(dealerId) {
    return this.storage.get(STORAGE_KEY  + "_" + dealerId);
  }

  removeLocalStorageItem(dealerId){
    this.storage.remove(STORAGE_KEY  + "_" + dealerId);
  }

}
