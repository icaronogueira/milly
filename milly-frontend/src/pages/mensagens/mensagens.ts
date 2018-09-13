import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MensagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html',
})
export class MensagensPage {
      @ViewChild(Navbar) navBar: Navbar;
      spinner: any;
      spinnerIsPresenting=false;
      numeroNotificacoes: number;
      usuario: any;
      
      constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, 
                  private loadingCtrl: LoadingController, private storage: Storage) {
      }

      ionViewDidLoad() {
            //Ação do back button
            this.navBar.backButtonClick = () => {
                  this.mostraSpinner();
                  this.events.publish('atualiza-numero-notificacoes', this.numeroNotificacoes, '');
                  this.events.publish('atualiza-notificacoes', this.usuario._id);
                  this.escondeSpinner();
                  this.navCtrl.pop();
            }

            this.storage.get('usuario.notificacoes').then(data => 
                  this.numeroNotificacoes=data.filter(n => n.lida==='N').length);
            

            this.storage.get('usuario').then(data => {
                  this.usuario=data;
            });
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

      irParaNotificacoes(){
            this.navCtrl.push('Notification');
      }

}
