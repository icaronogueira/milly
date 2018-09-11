import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class Notification {

      notificacoes: any;
      numeroNotificacoes: number;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
      }

      // go to another page
      ionViewDidLoad(){
            this.storage.get('usuario.notificacoes').then(data => {
                  this.notificacoes=data;
                  console.log(this.notificacoes);
                  this.numeroNotificacoes = this.notificacoes.filter(element => element.lida==='N').length;
            });
            
      }

      goTo(page){
            this.navCtrl.push(page);
      } 

      classLido(lida) {
            if (lida==='S') {
                  return 'item-lido';
            }
            return '';
      }

}
