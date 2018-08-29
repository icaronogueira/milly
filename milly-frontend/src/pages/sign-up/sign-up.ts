import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  country:string='country';
  // go to another page
goTo(page){
  this.navCtrl.push(page); 
  }
}
  