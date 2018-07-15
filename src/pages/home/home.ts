import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, App } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { FeedbackPage } from '../feedback/feedback';
import { SettingsPage } from '../settings/settings';
import { HelpPage } from '../help/help';
import { ContactusPage } from '../contactus/contactus';
import { LoginPage } from '../login/login';
import { UsersPage } from '../users/users';
import { QuestionsPage } from '../questions/questions';
import { ReportPage } from '../report/report';
import { DealerSupportPage } from '../dealer-support/dealer-support';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage: any;
  pages: Array<{title: string, page: any, icon: any}>;
  username = '';
 
  // Reference to the side menus root nav
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private appCtrl: App) {

  }

  ionViewWillEnter() {
    if (this.authProvider.isAdmin()) {
      this.pages = [
        { title: 'Report', page: ReportPage, icon: 'document' },
        { title: 'Users', page: UsersPage, icon: 'people' },
        { title: 'Questions', page: QuestionsPage, icon: 'help-circle' },
        { title: 'MSC Comments', page: DealerSupportPage, icon: 'text' },
        { title: 'Settings', page: SettingsPage, icon: 'settings' },
        ];
      this.openPage(ReportPage);
    } else {
      this.pages = [
        { title: 'Feedback', page: FeedbackPage, icon: 'alert' },
        { title: 'Settings', page: SettingsPage, icon: 'settings' },
        { title: 'FAQs', page: HelpPage, icon: 'paper' },
        { title: 'Contact Prod', page: ContactusPage, icon: 'mail-open' },
        ];
      this.openPage(FeedbackPage);
    }
    this.username = this.authProvider.currentUser.name;
  }
 
  logout() {
    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
 
  openPage(page) {
    this.nav.setRoot(page);
  }
 
  ionViewCanEnter() {
    return this.authProvider.isLoggedIn();
  }
}
