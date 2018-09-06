import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the AdminDepartamentosConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-departamentos-config',
  templateUrl: 'admin-departamentos-config.html',
})
export class AdminDepartamentosConfigPage {

      headerText: string;      

      constructor(public navCtrl: NavController, public navParams: NavParams) {
            
      }

      ionViewDidLoad() {
            if (this.navParams.get('acao')==='adicionar'){
                  this.headerText = 'Adicionar Departamento';
            }
      }

}
