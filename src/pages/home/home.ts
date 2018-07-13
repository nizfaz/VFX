import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, App } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { ListPage } from '../list/list';
import { FeedbackPage } from '../feedback/feedback';
import { SettingsPage } from '../settings/settings';
import { HelpPage } from '../help/help';
import { ContactusPage } from '../contactus/contactus';
import { LoginPage } from '../login/login';
import { UsersPage } from '../users/users';
import { QuestionsPage } from '../questions/questions';
import { ReportPage } from '../report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage: any;
  pages: Array<{title: string, page: any}>;
  username = '';
 
  // Reference to the side menus root nav
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private appCtrl: App) {

  }

  ionViewWillEnter() {
    if (this.authProvider.isAdmin()) {
      this.pages = [
        { title: 'List', page: ListPage },
        { title: 'Report', page: ReportPage },
        { title: 'Users', page: UsersPage },
        { title: 'Questions', page: QuestionsPage },
        { title: 'Settings', page: SettingsPage },
        ];
      this.openPage(ListPage);
    } else {
      this.pages = [
        { title: 'Feedback', page: FeedbackPage },
        { title: 'Settings', page: SettingsPage },
        { title: 'Help', page: HelpPage },
        { title: 'Contact Us', page: ContactusPage },
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
