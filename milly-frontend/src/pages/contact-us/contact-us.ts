import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUs {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // go to another page
  goTo(page){
    this.navCtrl.push(page);
  }  

}
