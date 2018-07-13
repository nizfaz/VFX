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
import { AddQuestionPage } from '../pages/add-question/add-question';
import {ContactusPage} from '../pages/contactus/contactus';
import { CustomersCommentsPage } from '../pages/customers-comments/customers-comments';
import { DealerSupportPage } from '../pages/dealer-support/dealer-support';
import {DealerUsersPage} from '../pages/dealer-users/dealer-users';
import {FeedbackPage} from '../pages/feedback/feedback';
import {HelpPage} from '../pages/help/help';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {ProdUsersPage} from '../pages/prod-users/prod-users';
import {QuestionsPage} from '../pages/questions/questions';
import { ReportPage } from '../pages/report/report';
import {SettingsPage} from '../pages/settings/settings';
import {StatisticsPage} from '../pages/statistics/statistics';
import {UsersPage} from '../pages/users/users';
import {ThankyouPage} from '../pages/thankyou/thankyou';
import { HttpModule } from '@angular/http';
import { SortPipe } from '../pipes/sort/sort';

@NgModule({
  declarations: [
    MyApp,
    AddDealerPage,
    AddProdUserPage,
    AddQuestionPage,
    ContactusPage,
    CustomersCommentsPage,
    DealerSupportPage,
    DealerUsersPage,
    FeedbackPage,
    HelpPage,
    HomePage,
    LoginPage,
    ProdUsersPage,
    QuestionsPage,
    ReportPage,
    SettingsPage,
    StatisticsPage,
    UsersPage,
    ThankyouPage,
    SortPipe
  ],
  imports: [
    HttpClientModule,
    HttpModule,
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
    AddQuestionPage,
    ContactusPage,
    CustomersCommentsPage,
    DealerSupportPage,
    DealerUsersPage,
    FeedbackPage,
    HelpPage,
    HomePage,
    LoginPage,
    ProdUsersPage,
    QuestionsPage,
    ReportPage,
    SettingsPage,
    StatisticsPage,
    UsersPage,
    ThankyouPage
  ],
  providers: [
    StatusBar,
        HttpModule,
     SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
