import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as EmailValidator from 'email-validator';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignIn {

      email: string;
      senha: string;

      passwordType: string = "password";
      passwordIcon: string = "eye";

      spinner: any;

      constructor(public navCtrl: NavController, public navParams: NavParams,
                  private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                  private usuarioProvider: UsuarioProvider, private storage: Storage) {
            
      }

      ionViewDidLoad(){
            this.storage.get('usuario.email').then(data => {
                  if (data) {
                        this.navCtrl.setRoot("Home");
                  } else {
                        this.email = this.navParams.get('emailCadastrado')==undefined ? ''
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
} 
     