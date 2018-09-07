import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DepartamentoProvider } from '../../providers/departamento/departamento';

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
      idIgreja: string;
      departamentos: any;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
                  private departamentoProvider: DepartamentoProvider) {
      }

      ionViewCanEnter() {
            
      }

      ionViewDidLoad() {
            this.storage.get('usuario.igreja').then(data => this.nomeIgreja=data);
            this.storage.get('usuario.igreja.id').then(data => {
                  this.idIgreja=data;
                  this.departamentoProvider.getDepartamentos(this.idIgreja).subscribe(res => {
                        console.log(res.departamentos);
                        if (!res.error) {
                              this.departamentos = res.departamentos;
                        }
                  });
            });
            
            
      }

      paraConfiguracaoDepartamento() {
            this.navCtrl.push("AdminDepartamentosConfigPage", {
                  acao: 'adicionar'
            });
      }

}
