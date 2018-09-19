import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { DepartamentoProvider } from '../../providers/departamento/departamento';

/**
 * Generated class for the MarcarDepartamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marcar-departamentos',
  templateUrl: 'marcar-departamentos.html',
})
export class MarcarDepartamentosPage {
      @ViewChild(Navbar) navBar: Navbar;
      departamentos: any;
      departamento: any;
      idIgreja: string;

      lista=[];

      constructor(public navCtrl: NavController, public navParams: NavParams, private departamentoProvider: DepartamentoProvider,
                  private events: Events) {
      }
      ionViewCanEnter() {
            this.navBar.backButtonClick = () => {
                  this.events.publish('departamentos-participantes',this.lista);
                  this.navCtrl.pop();
            }
      }

      ionViewDidLoad() {
            this.departamento = this.navParams.get('departamento');
            this.idIgreja = this.navParams.get('idIgreja');
            this.lista = this.navParams.get('lista');

            this.departamentoProvider.getDepartamentos(this.idIgreja).subscribe(res => this.departamentos=res.departamentos);
      }

      adiciona(departamento) {
            if (this.lista.some(l => l._id===departamento._id)) {
                  this.lista = this.lista.filter(item => item._id!==departamento._id);
            } else {
                  this.lista.push(departamento);
            }
            console.log(this.lista);
      }

      estaNaLista(departamento) {
            let esta=false;
            this.lista.forEach(element => {
                  if (element._id===departamento._id) {
                        esta=true;
                  }
            });
            return esta;
      }

}
