import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignIn {

      emailCadastrado: string;

      constructor(public navCtrl: NavController, public navParams: NavParams) {
            this.emailCadastrado = this.navParams.get('emailCadastrado')==undefined ? ''
                  : this.navParams.get('emailCadastrado');
      }

      ionViewDidLoad(){
            
      }

      // go to another page
      goTo(page){
            this.navCtrl.push(page);
      }
} 
     