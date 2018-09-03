import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the HomeAdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-administrador',
  templateUrl: 'home-administrador.html',
})
export class HomeAdministradorPage {



      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
            private events: Events) {
      }

      ionViewDidLoad() {
            this.storage.get('usuario.igreja').then(data => {
                  this.events.publish('atualizaMenu', 'administrador', data);
            });

           
            
      }

    

}
