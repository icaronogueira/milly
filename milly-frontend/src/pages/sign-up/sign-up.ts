import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IgrejaProvider } from '../../providers/igreja/igreja';
import * as EmailValidator from 'email-validator';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {

      igrejas: any;
      nome: string;
      email: string;
      igreja: string;
      senha: string;
      confirmaSenha: string;

      passwordType: string = "password";
      passwordIcon: string = "eye";

      confirmPasswordType: string = "password";
      confirmPasswordIcon: string = "eye";

      

      constructor(public navCtrl: NavController,
                  public navParams: NavParams,
                  private igrejaProvider :IgrejaProvider,
                  private alertCtrl: AlertController,
                  private usuarioProvider: UsuarioProvider) {
      }

      
      ionViewDidLoad() {
            this.getIgrejas();
      }

      // go to another page
      goTo(page){
            this.navCtrl.push(page); 
      }

      getIgrejas() {
            this.igrejaProvider.getIgrejas().subscribe(res => {
                  this.igrejas = res.result;
                  console.log(this.igrejas);
            });
      }

      cadastrarMembro(){
            if (!this.temErro()) {
                  this.usuarioProvider.cadastraUsuario(this.nome, this.email, this.igreja, this.senha)
                        .subscribe(res => {
                              console.log(res);
                        });
            }
      }


      temErro(): boolean {
            let erro: boolean=false;
            let subTitle: string;
            if (!EmailValidator.validate(this.email)){
                  erro=true;
                  subTitle="Email inválido";
            }

            if (this.senha!==this.confirmaSenha){
                  erro=true;
                  subTitle="Senhas não coincidem.";

            }

            if (this.nome==="" || this.email==="" || this.igreja==="" || this.senha===""){
                  erro=true;
                  subTitle="Preencha todos os campos.";

            }

            if (this.nome===undefined || this.email===undefined || this.igreja===undefined || this.senha===undefined){
                  erro=true;
                  subTitle="Preencha todos os campos.";
            }

            if (erro) {
                  this.alertCtrl.create({
                        title: "Erro no cadastro",
                        subTitle: subTitle,
                        buttons: ["OK"]
                  }).present();
            }
            return erro;
      }

      showHidePassword() {
            this.passwordType = this.passwordType === "password" ? "text":"password";
            this.passwordIcon = this.passwordIcon === "eye" ? "eye-off" : "eye";

      }
      showHideConfirmPassword() {
            this.confirmPasswordType = this.confirmPasswordType === "password" ? "text":"password";
            this.confirmPasswordIcon = this.confirmPasswordIcon === "eye" ? "eye-off" : "eye";
      }

}
  