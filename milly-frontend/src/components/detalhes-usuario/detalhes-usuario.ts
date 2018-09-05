import { Component } from '@angular/core';
import { NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import moment from 'moment';

/**
 * Generated class for the DetalhesUsuarioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detalhes-usuario',
  templateUrl: 'detalhes-usuario.html'
})
export class DetalhesUsuarioComponent {
      
      membro: any;
      permissao: string;
      ativo: string;
      spinner: any;

      constructor(params: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController,
                  private loadingCtrl: LoadingController, private usuarioProvider: UsuarioProvider) {
            this.membro=params.get('membro');
            this.permissao=this.membro.permissao;
            this.ativo=this.membro.ativo;
            console.log(this.membro);
      }

      aceitarNegarAcesso(acao: string) {
            
            this.alertCtrl.create({
                  title: `Deseja realmente ${acao} o acesso de ${this.membro.nome}?`,
                  buttons: [
                        {
                              text: 'Voltar'      
                        },
                        {
                              text: 'Confirmar',
                              handler: () => {
                                    this.mostraSpinner();
                                    //confirma/nega acesso no banco
                                    this.usuarioProvider.confirmaNegaAcesso(this.membro, acao)
                                          .subscribe(res => {
                                                this.escondeSpinner();
                                                //alerta de confirmação
                                                let text = res.error ? res.error : res.message;
                                                this.alertCtrl.create({
                                                      title: text,
                                                      buttons: ['OK']
                                                }).present();
                                                this.viewCtrl.dismiss();
                                                //dá um refresh nas listas

                                          });
                              }
                        }
                  ]
            }).present();
      }

      voltar() {
            this.viewCtrl.dismiss();
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

      getTimeAgo(data) {
            return moment(data).fromNow();
      }

}
