import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
  import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';



/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
 
   
  
    information: any[];
   
    constructor(public navCtrl: NavController, private http: Http) {
      let localData = this.http.get('assets/information.json').map(res => res.json().items);
      localData.subscribe(data => {
        this.information = data;
      })
    }
   
    toggleSection(i) {
      this.information[i].open = !this.information[i].open;
    }
   
    toggleItem(i, j) {
      this.information[i].children[j].open = !this.information[i].children[j].open;
    }
   
  }
