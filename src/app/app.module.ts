import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import {AddDealerPage} from '../pages/add-dealer/add-dealer';
import { AddProdUserPage } from '../pages/add-prod-user/add-prod-user';
import {ContactusPage} from '../pages/contactus/contactus';
import {DealersQueryPage} from '../pages/dealers-query/dealers-query';
import {DealerUsersPage} from '../pages/dealer-users/dealer-users';
import {FeedbackPage} from '../pages/feedback/feedback';
import {HelpPage} from '../pages/help/help';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {ProdUsersPage} from '../pages/prod-users/prod-users';
import {QuestionsPage} from '../pages/questions/questions';
import {SettingsPage} from '../pages/settings/settings';
import {StatisticsPage} from '../pages/statistics/statistics';
import {UsersPage} from '../pages/users/users';
import {ThankyouPage} from '../pages/thankyou/thankyou';

@NgModule({
  declarations: [
    MyApp,
    AddDealerPage,
    AddProdUserPage,
    ContactusPage,
    DealersQueryPage,
    DealerUsersPage,
    FeedbackPage,
    HelpPage,
    HomePage,
    ListPage,
    LoginPage,
    ProdUsersPage,
    QuestionsPage,
    SettingsPage,
    StatisticsPage,
    UsersPage,
    ThankyouPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase, 'volvofeedbackapp'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddDealerPage,
    AddProdUserPage,
    ContactusPage,
    DealersQueryPage,
    DealerUsersPage,
    FeedbackPage,
    HelpPage,
    HomePage,
    ListPage,
    LoginPage,
    ProdUsersPage,
    QuestionsPage,
    SettingsPage,
    StatisticsPage,
    UsersPage,
    ThankyouPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
