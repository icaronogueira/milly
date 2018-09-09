import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-enviar-mensagem',
  templateUrl: 'enviar-mensagem.html',
})
export class EnviarMensagemPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // go to another page
  goTo(page){
    this.navCtrl.push(page);
  }  

}
