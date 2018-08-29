import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignIn {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

// go to another page
goTo(page){
  this.navCtrl.push(page);
}
} 
     