import { Component } from '@angular/core';
import { Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import * as firebase from 'firebase';
import { Network } from '../../node_modules/@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';

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

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public events: Events, public splashScreen: SplashScreen,
    public network: Network, private toast: ToastController,
    public networkProvider: NetworkProvider) {    
    firebase.initializeApp(config);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
  //     this.networkProvider.initializeNetworkEvents();

  //     // Offline event
  //  this.events.subscribe('network:offline', () => {
  //   this.toast.create({
  //     message: 'network:offline ==> ' + this.network.type,
  //     duration: 3000
  //   }).present();
  //  });

  //  // Online event
  //  this.events.subscribe('network:online', () => {
  //   this.toast.create({
  //     message: 'network:online ==> ' + this.network.type,
  //     duration: 3000
  //   }).present();
  //  });      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
