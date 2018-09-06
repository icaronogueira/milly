import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AdminDepartamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-departamentos',
  templateUrl: 'admin-departamentos.html',
})
export class AdminDepartamentosPage {

      nomeIgreja: string;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
      }

      ionViewCanEnter() {
            
      }

      ionViewDidLoad() {
            this.storage.get('usuario.igreja').then(data => this.nomeIgreja=data);
      }

}
