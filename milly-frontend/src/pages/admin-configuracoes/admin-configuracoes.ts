import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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

      nomeIgrejaOriginal: string;
      nomeIgreja: string;
      senhaAdministrador: string;

      igreja: any;

      modifiedClassIgreja: string = 'unmodified';
      modifiedClassSenhaAdministrador: string = 'unmodified';
      disableButton=true;

      passwordType: string = "password";
      passwordIcon: string = "eye";
      
      spinner:any;

      constructor(public _myApp:MyApp,public navCtrl: NavController, public navParams: NavParams,
                  private storage: Storage, private igrejaProvider: IgrejaProvider,
                  private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
            
      }


      ionViewDidLoad(){
            //Pega dados da igreja do banco
            this.storage.get('usuario.igreja').then(data => {
                  this.igrejaProvider.getIgreja(data)
                        .subscribe(res => {
                              this.igreja  = res.igreja;
                              console.log(this.igreja);
                              this.nomeIgrejaOriginal=this.igreja.nome;
                              this.nomeIgreja=this.nomeIgrejaOriginal;
                              this.senhaAdministrador=this.igreja.senhaAdmin;
                        });
            });
      }

   
      // go to another page
      goTo(page){
            this.navCtrl.push(page);
      }

      mudouInput(input: string) {
            if (input === 'nomeIgreja') {
                  this.modifiedClassIgreja = 'modified';
            }
            if (input === 'senhaAdministrador') {
                  this.modifiedClassSenhaAdministrador = 'modified';
            }
            this.disableButton=false;
      }

      salvarConfiguracoes() {
            this.alertCtrl.create({
                  title: 'Confirmar modificações?',
                  subTitle: 'Verifique se suas definições estão corretas',
                  buttons: [{
                        text:'Voltar'
                  },{
                        text: 'Confirmar',
                        handler: () => {
                              this.igrejaProvider.atualizaConfiguracoes(this.nomeIgrejaOriginal, this.nomeIgreja, this.senhaAdministrador)
                                    .subscribe(res => {
                                          let text = (res.error) ? res.error : res.message;
                                          this.alertCtrl.create({
                                                title: text,
                                                buttons: ['OK']
                                          }).present();
                                          this.nomeIgrejaOriginal=this.nomeIgreja;
                                          this.storage.set('usuario.igreja', this.nomeIgreja);
                                    });
                        }
                  }]
            }).present();
      }

      showHidePassword() {
            this.passwordType = this.passwordType === "password" ? "text":"password";
            this.passwordIcon = this.passwordIcon === "eye" ? "eye-off" : "eye";
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
}
