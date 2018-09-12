import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartamentoProvider } from '../../providers/departamento/departamento';

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


      constructor(public navCtrl: NavController, public navParams: NavParams, private departamentoProvider: DepartamentoProvider) {
      }

      ionViewDidLoad() {

            //Pegar Departamento
            this.departamento=this.navParams.get('departamento');
            if (!this.departamento) {
                  let dataAdicional=this.navParams.get('dataAdicional');
                  if (dataAdicional) {
                        this.departamentoProvider.getDepartamento(dataAdicional).subscribe(res => {
                              console.log(res.departamento);
                              this.departamento=res.departamento;
                        });
                  } else {
                        console.log('Erro no acesso à página de departamento.')
                  }
            }
            
            console.log(this.departamento);
            
            
      }

}
