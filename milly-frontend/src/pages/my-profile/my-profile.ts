import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfile {
  public action = false;
  constructor(public _myApp:MyApp,public navCtrl: NavController, public navParams: NavParams) {
     this.action = this._myApp.animateVarible;
  }
  country:string='country'; 
  public show:boolean=false;
  text:string='Update';
  showInput(){
    if(this.show!=true){
      this.show=true;
      this.text='Save';
    }
    else{
      this.show=false;
      this.text='Update';
    }
  }
// animate Function variable animateVarible in app.component
public checkbox;
animateApp(e:any){ 
  this._myApp.animateVarible = e.checked;
  this.action = this._myApp.animateVarible;

  }
// go to another page
goTo(page){
  this.navCtrl.push(page);
}

}
