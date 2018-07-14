import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDataProvider {

  public key: any;
  public userName: any;
  public password: any;
  public language: any;
  public userDBRef: AngularFireList<any>;

  constructor(public http: HttpClient) {
    console.log('Hello UserDataProvider Provider');
  }

}
