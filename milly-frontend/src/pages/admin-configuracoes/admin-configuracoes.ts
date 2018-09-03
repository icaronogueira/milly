import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { IgrejaProvider } from '../../providers/igreja/igreja';

/**
 * Generated class for the AdminConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-configuracoes',
  templateUrl: 'admin-configuracoes.html',
})
export class AdminConfiguracoesPage {


      nomeIgreja: string;
      senhaAdministrador: string;

      igreja: any;

      constructor(public _myApp:MyApp,public navCtrl: NavController, public navParams: NavParams,
                  private storage: Storage, private igrejaProvider: IgrejaProvider) {
            //Pega dados da igreja do banco
            this.storage.get('usuario.igreja').then(data => {
                  this.igrejaProvider.getIgreja(data)
                        .subscribe(res => {
                              this.igreja  = res.igreja;
                              console.log(this.igreja);
                              this.nomeIgreja=this.igreja.nome;
                              this.senhaAdministrador=this.igreja.senhaAdmin;
                        });
            });
      }


      ionViewDidLoad(){
            
      }

   
      // go to another page
      goTo(page){
            this.navCtrl.push(page);
      }
}
