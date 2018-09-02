import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
                  private storage: Storage, private usuarioProvider: UsuarioProvider, private loadingCtrl: LoadingController) {
      }

      ionViewDidLoad(){
            this.storage.get('usuario.email').then(data => {

                  if (data!=="administrador") {
                        
                        this.mostraSpinner();
                        //verifica se o usuario já tem acesso ao sistema
                        this.usuarioProvider.getDadosUsuario(data).subscribe(res => {
                              this.escondeSpinner();
                              this.usuario = res.usuario;

                              console.log(this.usuario);
                        
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
                                                                        this.usuarioProvider.deletaUsuario(this.usuario.email)
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
                                                      this.navCtrl.setRoot('SignIn', {emailCadastrado: this.usuario.email});
                                                }
                                          }],
                                          enableBackdropDismiss: false
                                    }).present();
                              }

                        });


                  } // data!== administrador     
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
