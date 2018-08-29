import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  items=[
    {img:'assets/img/004.png',title:'International sports tournament'},
    {img:'assets/img/002.png',title:'International sports tournament'},
    {img:'assets/img/003.png',title:'International sports tournament'},
    {img:'assets/img/001.png',title:'International sports tournament'},
    {img:'assets/img/004.png',title:'International sports tournament'},
    {img:'assets/img/002.png',title:'International sports tournament'},
    {img:'assets/img/003.png',title:'International sports tournament'},
    {img:'assets/img/001.png',title:'International sports tournament'},
  ]

  // go to another page
goTo(page){
  this.navCtrl.push(page);
  }
}
