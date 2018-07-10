import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCYmIkcV88RC_lixJM1db-BbGTl9Z_V06c",
  authDomain: "volvofeedbackapp.firebaseapp.com",
  databaseURL: "https://volvofeedbackapp.firebaseio.com",
  projectId: "volvofeedbackapp",
  storageBucket: "volvofeedbackapp.appspot.com",
  messagingSenderId: "676221918250"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {    
    firebase.initializeApp(config);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
