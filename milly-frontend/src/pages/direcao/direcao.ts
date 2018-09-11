import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DepartamentoProvider } from '../../providers/departamento/departamento';

/**
 * Generated class for the DirecaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-direcao',
  templateUrl: 'direcao.html',
})
export class DirecaoPage {

      nomeIgreja: string;
      idIgreja: string;
      numeroNotificacoes: number;

      departamentos: any;

      spinner: any;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
                  private departamentoProvider: DepartamentoProvider, private loadingCtrl: LoadingController) {
      }

      ionViewDidLoad() {
            this.storage.get('usuario.notificacoes').then(data => 
                  this.numeroNotificacoes=data.filter(n => n.lida==='N').length);
            

            this.storage.get('usuario').then(data => {
                  this.nomeIgreja=data.igreja.nome;
                  this.idIgreja=data.igreja._id;

                  //pega departamentos
                  this.mostraSpinner();
                  this.departamentoProvider.getDepartamentos(this.idIgreja).subscribe(res => {
                        this.escondeSpinner();
                        this.departamentos=res.departamentos;
                  });
            });

            
      }


      mostraSpinner(){
            this.spinner = this.loadingCtrl.create({
                  spinner: 'crescent'
            });
            this.spinner.present();
      }

      escondeSpinner(){
            this.spinner.dismiss();
      }


      toggleSection(i){
            this.departamentos[i].open = !this.departamentos[i].open;
      }

      

}
