import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-departamentos-config',
  templateUrl: 'admin-departamentos-config.html',
})
export class AdminDepartamentosConfigPage {

      headerText: string;      
      diretor: any;
      diretorNome: string = '';
      constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
            this.events.subscribe('designaDiretor', (data, user) => {
                  this.diretor=data;
                  this.diretorNome=this.diretor.nome;
                  console.log(this.diretor);
            });
      }

      ionViewDidLoad() {
            if (this.navParams.get('acao')==='adicionar'){
                  this.headerText = 'Adicionar Departamento';
            }
      }


      abrirModalDiretor() {
            this.navCtrl.push("SearchableListPage");
      }
}
