import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUs {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  // go to another page
  goTo(page){
    this.navCtrl.push(page);
  }  

}
