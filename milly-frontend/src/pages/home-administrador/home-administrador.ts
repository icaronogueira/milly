import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { IgrejaProvider } from '../../providers/igreja/igreja';
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

      nomeIgreja: string;

      spinner: any;
      spinnerIsPresenting=false;      

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
            private events: Events, private igrejaProvider: IgrejaProvider, private loadingCtrl: LoadingController) {
                  console.log('Atualiza o menu por favor?');
                  this.mostraSpinner();
                  this.storage.get('usuario.igreja').then(data => {
                        this.nomeIgreja=data;
                  
                        this.igrejaProvider.getIgreja(data).subscribe(res => {
                              this.escondeSpinner();
                              console.log(res);
                              this.storage.set('usuario.igreja.id', res.igreja._id);
                        });
                  });
                  
      }

      ionViewCanEnter() {
           this.events.publish('atualizaMenu', 'administrador', '');
      }

      abrePagina(componente) {
            this.navCtrl.push(componente);
      }

      mostraSpinner(){
            this.spinner = this.loadingCtrl.create({
                  spinner: 'crescent'
            });
            if (!this.spinnerIsPresenting) {
                  this.spinnerIsPresenting=true;
                  this.spinner.present();
            }    
      }

      escondeSpinner(){
            this.spinner.dismiss();
            this.spinnerIsPresenting=false;
      }

}
