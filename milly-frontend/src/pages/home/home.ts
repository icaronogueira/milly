import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {


      usuario: any;
      nomeIgreja: string;
      spinner: any;
      spinnerIsPresenting=false;

      notificacoes: any;
      notificacoesNaoLidas: number;
      

      constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
                  private storage: Storage, private usuarioProvider: UsuarioProvider, private loadingCtrl: LoadingController,
                  private events: Events, private notificacaoProvider: NotificacaoProvider, private toastCtrl: ToastController) {

            this.events.subscribe('atualiza-notificacoes',(idUsuario) => {
                  console.log('Atualizando notificacoes');
                  this.mostraSpinner();
                  this.notificacaoProvider.getNotificacoes(idUsuario).subscribe(res => {
                        console.log(res);
                        this.escondeSpinner();
                        if (!res.error) {
                              this.notificacoes=res.notificacoes;
                              this.storage.set('usuario.notificacoes', this.notificacoes);
                              this.notificacoesNaoLidas=this.notificacoes.filter(event => event.lida==="N").length;
                              this.events.publish('atualiza-numero-notificacoes', this.notificacoesNaoLidas, '');
                        }
                  });
            });
                        
                        
      }

      ionViewDidLoad(){

            
            //atualiza Menu Laterall
            this.events.publish('atualizaMenu', '','');
            
            
            this.storage.get('usuario.email').then(data => {
                        
                  this.mostraSpinner();
                  //verifica se o usuario já tem acesso ao sistema
                  this.usuarioProvider.getDadosUsuario(data).subscribe(res => {
                        this.escondeSpinner();
                        this.usuario = res.usuario;
                        this.nomeIgreja = this.usuario.igreja.nome;
                        
                        
                        

                        console.log("Dados usuario");
                        console.log(this.usuario);

                        
                        //CASO = A PERMISSAO AINDA ESTÁ PENDENTE
                        if (this.usuario.permissao === "N") {
                              this.storage.remove('usuario.email');
                              this.alertCtrl.create({
                                    title:'Acesso não autorizado',
                                    subTitle: 'Sua autorização ainda está pendente. Entre em contato com a administração de sua igreja.',
                                    buttons: [{
                                          text: 'Cancelar Solicitação',
                                          handler: () => {
                                                //outro alert
                                                this.alertCtrl.create({
                                                      title: 'Deseja realmente cancelar a solicitação de acesso?',
                                                      subTitle: 'Será necessário refazer seu cadastro posteriormente.',
                                                      buttons: [{
                                                            text: "Não",
                                                            handler: () => {
                                                                  this.navCtrl.setRoot('SignIn', {emailCadastrado: this.usuario.email});
                                                            }
                                                      }, {
                                                            text: 'Sim',
                                                            handler: () => {
                                                                  //deleta usuario
                                                                  this.usuarioProvider.deletaUsuario(this.usuario)
                                                                        .subscribe(res => {
                                                                              if (res.message) {
                                                                                    this.toastCtrl.create({
                                                                                          message: res.message,
                                                                                          duration: 3000
                                                                                    }).present();
                                                                              }
                                                                        });
                                                                  //retorna para pagina de login
                                                                  this.navCtrl.setRoot("SignIn");
                                                            }
                                                      },]
                                                }).present();
                                          }
                                    }, {
                                          text: 'Voltar',
                                          handler: () => {
                                                this.storage.clear();
                                                this.navCtrl.setRoot('SignIn', {emailCadastrado: this.usuario.email});
                                          }
                                    }],
                                    enableBackdropDismiss: false
                              }).present();
                        } else {
                              // A PERMISSÃO FOI NEGADA OU O USUÁRIO REMOVIDO
                              if (this.usuario.permissao==='negada' || this.usuario.permissao==='removido') {
                                    let text= this.usuario.permissao==='negada' ? 'Sua solicitação de acesso foi negada.'
                                          : 'Você foi removido do sistema.';
                                    this.alertCtrl.create({
                                          title: text,
                                          subTitle: 'Seu cadastro foi removido. Entre em contato com o administrador de sua igreja.',
                                          buttons: [{
                                                text: 'OK',
                                                handler: () => {
                                                      //deleta usuario
                                                      this.storage.clear();
                                                      this.usuarioProvider.deletaUsuario(this.usuario)
                                                            .subscribe(res => {
                                                                  console.log(res);
                                                            });
                                                      //retorna para pagina de login
                                                      this.navCtrl.setRoot("SignIn");
                                                }
                                          },]
                                    }).present();
                              } else {
                                    //O USUÁRIO ESTÁ TEMPORARIAMENTE DESATIVADO
                                    if (this.usuario.ativo==='N') {
                                          this.alertCtrl.create({
                                                title: 'Seu acesso está desativado temporariamente',
                                                subTitle: 'Entre em contato com o administrador de sua igreja.',
                                                buttons: [{
                                                      text: 'OK',
                                                      handler: () => {
                                                            //deleta usuario
                                                            this.storage.clear();
                                                            this.navCtrl.setRoot("SignIn");
                                                      }
                                                },]
                                          }).present();
                                    }
                              }
                        }

                        //ACESSO PERMITIDO ******** Fazer inicializações aqui ************
                        this.storage.set('usuario.id', this.usuario._id);
                        this.storage.set('igreja.nome', this.nomeIgreja);
                        this.storage.set('usuario', this.usuario);
                        this.storage.set('usuario.igreja.id', this.usuario.igreja._id);

                        //iniciamenu

                        this.usuario.segue.forEach(dep => {
                              console.log("dep que segue");
                              console.log(dep);
                              this.events.publish('adicionaNoMenu', {
                                    title: dep.departamento.nome,
                                    component: 'DepartamentoPage',
                                    icon: `http://res.cloudinary.com/nogcloud/image/upload/v${dep.departamento.versaoLogo}/${dep.departamento.idLogo}`,
                                    departamento: dep.departamento
                              });
                        });
                       
                        //Atualiza imagem de perfil no menu lateral
                        this.events.publish('atualiza-perfil', this.usuario);

                        //Pega Notificações
                        this.events.publish('atualiza-notificacoes', this.usuario._id);
                        

                  });
    
            });
            

            // se permissao nao autorizada ainda volta para tela de login
           
      }

      items=[
            {img:'assets/img/004.png',title:'International sports tournament'},
            {img:'assets/img/002.png',title:'International sports tournament'},
            {img:'assets/img/003.png',title:'International sports tournament'},
            {img:'assets/img/001.png',title:'International sports tournament'},
            {img:'assets/img/004.png',title:'International sports tournament'},
            {img:'assets/img/002.png',title:'International sports tournament'},
            {img:'assets/img/003.png',title:'International sports tournament'},
            {img:'assets/img/001.png',title:'International sports tournament'},
      ]

      // go to another page
      irParaNotificacoes(){
            this.navCtrl.push('Notification');
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
