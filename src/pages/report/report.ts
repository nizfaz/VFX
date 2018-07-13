import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatisticsPage } from '../statistics/statistics';
import { CustomersCommentsPage } from '../customers-comments/customers-comments';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StatisticsPage;
  tab2Root: any = CustomersCommentsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

}
