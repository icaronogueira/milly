import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DepartamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-departamento',
  templateUrl: 'departamento.html',
})
export class DepartamentoPage {

      departamento: any;

      constructor(public navCtrl: NavController, public navParams: NavParams) {
      }

      ionViewDidLoad() {
            this.departamento=this.navParams.get('departamento');
            if (this.departamento) {console.log(this.departamento)}
      }

}
