import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';

/**
 * Generated class for the PedirDoacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedir-doacoes',
  templateUrl: 'pedir-doacoes.html',
})
export class PedirDoacoesPage {
      @ViewChild(Navbar) navBar: Navbar;
      item: string;
      quantidade: number;
      lista: any;
      constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
      }

      ionViewCanEnter() {
            this.navBar.backButtonClick = () => {
                  this.events.publish('pedidos-doacoes',this.lista);
                  this.navCtrl.pop();
            }
      }

      ionViewDidLoad() {
            this.lista= this.navParams.get('lista') ? this.navParams.get('lista') : [];
      }

      adicionar(){
            this.lista.push({
                  item: this.item,
                  quantidade: this.quantidade
            });
            this.item="";
            this.quantidade=null;
      }

      remover(i){
            this.lista.splice(i,1);
      }


}
