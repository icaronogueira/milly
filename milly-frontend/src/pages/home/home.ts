import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {


      usuario: any;

      spinner: any;

      constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
                  private storage: Storage, private usuarioProvider: UsuarioProvider, private loadingCtrl: LoadingController,
                  private events: Events) {
            
      }

      ionViewDidLoad(){
            this.events.publish('atualizaMenu', '','');
            this.storage.get('usuario.email').then(data => {
                        
                  this.mostraSpinner();
                  //verifica se o usuario já tem acesso ao sistema
                  this.usuarioProvider.getDadosUsuario(data).subscribe(res => {
                        this.escondeSpinner();
                        this.usuario = res.usuario;

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
                                                                                    this.alertCtrl.create({
                                                                                          title: res.message,
                                                                                          buttons: ['OK']
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
      goTo(page){
       this.navCtrl.push(page);
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
