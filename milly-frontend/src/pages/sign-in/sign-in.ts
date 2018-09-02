import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as EmailValidator from 'email-validator';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';
import facebookLogin from 'facebook-login';
import { IgrejaProvider } from '../../providers/igreja/igreja';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignIn {

      facebook = facebookLogin({appId: '573933443061890'});

      email: string;
      senha: string;

      igrejas: any;

      passwordType: string = "password";
      passwordIcon: string = "eye";

      spinner: any;

      constructor(public navCtrl: NavController, public navParams: NavParams,
                  private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                  private usuarioProvider: UsuarioProvider, private storage: Storage,
                  private igrejaProvider:IgrejaProvider ) {
            
      }

      ionViewDidLoad(){
            this.storage.get('usuario.email').then(data => {
                  if (data) {
                        this.navCtrl.setRoot("Home");
                  } else {
                        //preenche campo de email ao entrar na tela
                        this.email = ((this.navParams.get('emailCadastrado')==undefined) || (!EmailValidator.validate(this.email))) ? ''
                              : this.navParams.get('emailCadastrado');
                  }
            });
      }

      verificaLogin(){
            if (!this.temErro()){
                  this.mostraSpinner();

                  this.usuarioProvider.loginUsuario(this.email, this.senha).subscribe(res => {
                        this.escondeSpinner();
                        if (res.usuario) {
                              this.storage.set("usuario.email", res.usuario.email);
                              this.navCtrl.setRoot("Home");
                        }
                        if (res.error) {
                              this.alertCtrl.create({
                                    title: 'Erro no Login',
                                    subTitle: res.error,
                                    buttons: ['OK']
                              }).present();
                        }
                  });
            
            }
      }

      recuperaSenha(){
            this.usuarioProvider.recuperaSenha(this.email)
                  .subscribe(res => {
                        console.log(res);
                  });
      }

      paraCadastro(){
            this.navCtrl.push("SignUp");
      }

      temErro(){
            let erro: boolean=false;
            let subTitle: string;
            if (!EmailValidator.validate(this.email)){
                  erro=true;
                  subTitle="Email inválido";
            }

            if (this.email==="" || this.senha===""){
                  erro=true;
                  subTitle="Preencha todos os campos.";

            }

            if (this.email===undefined ||  this.senha===undefined){
                  erro=true;
                  subTitle="Preencha todos os campos.";
            }

            if (erro) {
                  this.alertCtrl.create({
                        title: "Erro",
                        subTitle: subTitle,
                        buttons: ["OK"]
                  }).present();
            }
            return erro;
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

      showHidePassword() {
            this.passwordType = this.passwordType === "password" ? "text":"password";
            this.passwordIcon = this.passwordIcon === "eye" ? "eye-off" : "eye";
      }

      loginFacebook() {
            this.mostraSpinner();
            this.getIgrejas();
            this.facebook.login().then(result => {
                  console.log(result);
                  this.usuarioProvider.dadosFacebook(result.authResponse.accessToken)
                        .subscribe(res => {
                              console.log(res);

                              //selecionar a igreja
                              let alertSelecionaIgreja = this.alertCtrl.create();
                              alertSelecionaIgreja.setTitle('Selecione sua igreja: ');
                              this.igrejas.forEach(igreja => {
                                    alertSelecionaIgreja.addInput({
                                          type: 'radio',
                                          label: igreja.nome,
                                          value: igreja.nome,
                                          checked: false
                                    });
                              });
                              alertSelecionaIgreja.addButton({
                                    text: 'OK',
                                    handler: data => {
                                          this.usuarioProvider.cadastraUsuario(res.name, res.id, data, 
                                                "senha", `https://graph.facebook.com/${res.id}/picture?type=large`,
                                                "facebook")
                                                .subscribe(res2 => {
                                                      console.log(res2);
                                                      this.escondeSpinner();
                                                      this.storage.set("usuario.email", res.id);
                                                       this.navCtrl.setRoot("Home");
                                                });
                                    }
                              });
                              alertSelecionaIgreja.present();
                             
                        });
            })
      }

      getIgrejas() {
            this.igrejaProvider.getIgrejas().subscribe(res => {
                  this.igrejas = res.result;
                  console.log(this.igrejas);
            });
      }
} 
     