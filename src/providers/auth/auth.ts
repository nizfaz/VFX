import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  id: string,
  name: string;
  role: number;
}

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  currentUser: User;

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(keyedPwd: string, keyedId: string, dbName: string, dbPwd: string, isAdmin: number) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (keyedPwd === dbPwd) {
        this.currentUser = {
          id: keyedId,
          name: dbName,
          role: isAdmin
        };
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
 
  isLoggedIn() {
    return this.currentUser != null;
  }
 
  isAdmin() {
    return this.currentUser.role === 1;
  }
 
  logout() {
    this.currentUser = null;
  }

}
