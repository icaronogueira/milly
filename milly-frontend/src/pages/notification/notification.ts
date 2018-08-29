import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class Notification {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  comments=[ 
    {name:'Matt Doman',img:'assets/img/006.png',text:'more'},
    {name:'Mical Matta',img:'assets/img/007.png',text:'more'},
    {name:'Matt Doman',img:'assets/img/006.png',text:'more'},
    {name:'Mical Matta',img:'assets/img/007.png',text:'more'},
    {name:'Matt Doman',img:'assets/img/006.png',text:'more'},
    {name:'Mical Matta',img:'assets/img/007.png',text:'more'},
    {name:'Matt Doman',img:'assets/img/006.png',text:'more'},
    {name:'Mical Matta',img:'assets/img/007.png',text:'more'},
    {name:'Matt Doman',img:'assets/img/006.png',text:'more'},
    {name:'Mical Matta',img:'assets/img/007.png',text:'more'},
    {name:'Matt Doman',img:'assets/img/006.png',text:'more'},
    {name:'Mical Matta',img:'assets/img/007.png',text:'more'},
    {name:'Matt Doman',img:'assets/img/006.png',text:'more'},
    {name:'Mical Matta',img:'assets/img/007.png',text:'more'},
  ]
  // go to another page
goTo(page){
  this.navCtrl.push(page);
  } 

}
