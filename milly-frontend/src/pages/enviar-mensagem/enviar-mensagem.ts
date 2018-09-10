import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DepartamentoProvider } from '../../providers/departamento/departamento';
import { MensagemProvider } from '../../providers/mensagem/mensagem';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';


@IonicPage()
@Component({
  selector: 'page-enviar-mensagem',
  templateUrl: 'enviar-mensagem.html',
})
export class EnviarMensagemPage {

      spinner: any;

      departamentos: any;

      texto: string;
      destinatarios: string;
      paraDepartamento: string;
      igrejaId: string;
      assunto: string;

      disableSelectDepartamentos: boolean = true;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
                  private departamentoProvider: DepartamentoProvider, private loadingCtrl: LoadingController,
                  private mensagemProvider: MensagemProvider, private alertCtrl: AlertController) {
      }

      
      ionViewDidLoad(){
            this.mostraSpinner();
            this.storage.get('usuario.igreja.id').then(data => {
                  this.igrejaId=data;
                  this.departamentoProvider.getDepartamentos(data).subscribe(res => {
                        this.escondeSpinner();
                        this.departamentos = res.departamentos;
                        console.log(res);
                  });
            });
      }

      selecionaDestinatario(value) {
            if (value==="seguidores") {
                  this.disableSelectDepartamentos=false;
            } else {
                  this.disableSelectDepartamentos=true;
            }
      }

      enviarMensagem() {
            if (!this.temErros()) {
                  this.alertCtrl.create({
                        title: 'Confirmar envio de mensagem?',
                        buttons: [{text: 'Não'},{
                              text: 'Sim',
                              handler: () => {
                                    let tipoDestinatario;
                                    switch (this.destinatarios) {
                                          case 'todos': tipoDestinatario=1; break;
                                          case 'diretores': tipoDestinatario=2; break;
                                          case 'seguidores': tipoDestinatario=3; break;
                                    }
                                    this.mostraSpinner();
                                    this.mensagemProvider.enviaMensagem(this.texto, this.assunto, tipoDestinatario, this.paraDepartamento, this.igrejaId)
                                          .subscribe(res => {
                                                this.escondeSpinner();
                                                this.alertCtrl.create({
                                                      title: res.message ? res.message : res.error,
                                                      buttons: ['OK']
                                                }).present();
                                                this.navCtrl.pop();

                                                
                                          });
                              }
                        }]
                  }).present();

            }
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

      temErros() {
            let temErro=false;
            if (this.destinatarios==undefined) {
                  temErro=true;
            }
            if (!this.disableSelectDepartamentos && this.paraDepartamento==undefined) {
                  temErro=true;
            }
            if (this.texto==="" || this.assunto==="") {
                  temErro=true;
            }
            if(this.texto==undefined || this.assunto==undefined) {
                  temErro=true;
            }
            if (temErro) {
                  this.alertCtrl.create({
                        title:"Preencha os campos corretamente.",
                        buttons: ['OK']
                  }).present();
            }
            return temErro;
      }

}
