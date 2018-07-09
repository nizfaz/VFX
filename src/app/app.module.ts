import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'; 

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import {ContactusPage} from '../pages/contactus/contactus';
import {DealersQueryPage} from '../pages/dealers-query/dealers-query';
import {FeedbackPage} from '../pages/feedback/feedback';
import {HelpPage} from '../pages/help/help';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {QuestionsPage} from '../pages/questions/questions';
import {SettingsPage} from '../pages/settings/settings';
import {StatisticsPage} from '../pages/statistics/statistics';
import {UsersPage} from '../pages/users/users';

@NgModule({
  declarations: [
    MyApp,
    ContactusPage,
    DealersQueryPage,
    FeedbackPage,
    HelpPage,
    HomePage,
    ListPage,
    LoginPage,
    QuestionsPage,
    SettingsPage,
    StatisticsPage,
    UsersPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactusPage,
    DealersQueryPage,
    FeedbackPage,
    HelpPage,
    HomePage,
    ListPage,
    LoginPage,
    QuestionsPage,
    SettingsPage,
    StatisticsPage,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
