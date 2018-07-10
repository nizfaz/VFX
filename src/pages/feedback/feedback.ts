import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

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
  scale: any;   
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  @ViewChild('pager') slider: Slides;

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  buttonClick1(value){
    alert("clicked : " + value);
    this.slider.slideNext();
    this.scale = null;
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
