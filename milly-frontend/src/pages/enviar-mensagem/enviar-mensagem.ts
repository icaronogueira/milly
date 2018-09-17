import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
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
      spinnerIsPresenting=false;

      departamentos: any;

      texto: string;
      destinatarios: string;
      paraDepartamento: string;
      igrejaId: string;
      assunto: string;

      destinatarioDefId: string; 
      destinatarioDefNome: string;
      remetenteDef: any;
      disableSelectDepartamentos: boolean = true;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
                  private departamentoProvider: DepartamentoProvider, private loadingCtrl: LoadingController,
                  private mensagemProvider: MensagemProvider, private alertCtrl: AlertController,
                  private notificacaoProvider: NotificacaoProvider, private toastCtrl: ToastController) {
      }

      
      ionViewDidLoad(){
            this.mostraSpinner();
            this.storage.get('usuario.igreja.id').then(data => {
                  if (data) {
                        this.igrejaId=data;
                        this.departamentoProvider.getDepartamentos(data).subscribe(res => {
                              this.escondeSpinner();
                              this.departamentos = res.departamentos;
                              console.log(res);
                        });
                  } else {
                        this.escondeSpinner();
                  }
            });

            this.destinatarioDefId = this.navParams.get('id');
            this.destinatarioDefNome = this.navParams.get('nome');
            this.remetenteDef = this.navParams.get('remetente');
            if (this.destinatarioDefId) console.log('Destinatario Definido: ' + this.destinatarioDefId + ',' + this.destinatarioDefNome);
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
                                    if (this.destinatarioDefId) {
                                          this.mensagemProvider.enviaMensagemParaUsuario(this.texto, this.assunto, this.destinatarioDefId, this.destinatarioDefNome)
                                                .subscribe(res => {
                                                      console.log(res.mensagem);
                                                      this.escondeSpinner();

                                                      //notifica o destinatario que recebeu a mensagem
                                                      this.notificacaoProvider.criaNotificacao(res.mensagem.infoUsuario[0].usuario,
                                                            `Você recebeu uma mensagem de : ${this.remetenteDef.nome}`,
                                                            "MensagensPage", this.remetenteDef.nome, this.remetenteDef.idImagem,
                                                            this.remetenteDef.versaoImagem)
                                                                  .subscribe(res2 => console.log(res2));

                                                      this.toastCtrl.create({
                                                            message: res.message ? res.message : res.error,
                                                            duration: 3000
                                                      }).present();
                                                      this.navCtrl.pop();
                                                });
                                    } else {
                                          let tipoDestinatario;
                                          switch (this.destinatarios) {
                                                case 'todos': tipoDestinatario=1; break;
                                                case 'diretores': tipoDestinatario=2; break;
                                                case 'seguidores': tipoDestinatario=3; break;
                                          }
                                          this.mostraSpinner();
                                          this.mensagemProvider.enviaMensagem(this.texto, this.assunto, tipoDestinatario, this.paraDepartamento, this.igrejaId)
                                                .subscribe(res => {
                                                      console.log(res.mensagem);
                                                      this.escondeSpinner();

                                                      //aviso que enviou a mensagem
                                                      this.toastCtrl.create({
                                                            message: res.message ? res.message : res.error,
                                                            duration: 3000
                                                      }).present();

                                                      res.mensagem.infoUsuario.forEach(element => {
                                                            //notifica os destinatarios
                                                            this.notificacaoProvider.criaNotificacao(element.usuario,
                                                                  `Você recebeu uma mensagem da Administração da sua igreja.`,
                                                                  "MensagensPage", "Administração")
                                                                        .subscribe(res2 => console.log(res2));
                                                      });
                                                      

                                                      this.navCtrl.pop();

                                                      
                                                });
                                    }
                                    
                              }
                        }]
                  }).present();

            }
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

      temErros() {
            let temErro=false;
            if (!this.destinatarioDefId) {
                  if (this.destinatarios==undefined) {
                        temErro=true;
                  }
                  if (!this.disableSelectDepartamentos && this.paraDepartamento==undefined) {
                        temErro=true;
                  }
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
