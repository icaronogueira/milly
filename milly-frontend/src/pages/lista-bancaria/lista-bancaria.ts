import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';

/**
 * Generated class for the ListaBancariaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-bancaria',
  templateUrl: 'lista-bancaria.html',
})
export class ListaBancariaPage {
      @ViewChild(Navbar) navBar: Navbar;
      banco: string;
      agencia: string;
      conta: string;
      titular: string;
      lista: any;
      constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
      }

      ionViewCanEnter() {
            this.navBar.backButtonClick = () => {
                  this.events.publish('contas-transferencia',this.lista);
                  this.navCtrl.pop();
            }
      }

      ionViewDidLoad() {
            this.lista= this.navParams.get('lista') ? this.navParams.get('lista') : [];
      }

      adicionar(){
            this.lista.push({
                  banco: this.banco,
                  agencia: this.agencia,
                  conta: this.conta,
                  titular: this.titular
            });
            this.banco="";
            this.agencia="";
            this.conta="";
            this.titular="";
      }

      remover(i){
            this.lista.splice(i,1);
      }

}
