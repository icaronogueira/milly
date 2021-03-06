import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { IgrejaProvider } from '../../providers/igreja/igreja';
import * as EmailValidator from 'email-validator';

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

      spinner: any;
      spinnerIsPresenting=false;

      constructor(public navCtrl: NavController,
                  public navParams: NavParams,
                  private igrejaProvider :IgrejaProvider,
                  private alertCtrl: AlertController,
                  private loadingCtrl: LoadingController) {
      }

      
      ionViewDidLoad() {
            
            //Inicializa lista de igrejas
            this.getIgrejas();
      }

      continuar() {
            if (!this.temErro()) {
                  this.alertCtrl.create({
                        title: `O email ${this.email} está correto?`,
                        buttons: [{text:'Não'}, {
                              text: 'Sim',
                              handler: () => {
                                    this.navCtrl.push("RegistrarfotoPage", {
                                          nome: this.nome,
                                          email: this.email,
                                          igreja: this.igreja,
                                          senha: this.senha
                                    });
                              }
                        }] 
                  }).present();
                  
            }
      }
      
      // go to another page
      goTo(page){
            this.navCtrl.push(page); 
      }

      getIgrejas() {
            this.mostraSpinner();
            this.igrejaProvider.getIgrejas().subscribe(res => {
                  this.igrejas = res.result;
                  console.log(this.igrejas);
                  this.escondeSpinner();
            });
      }

      temErro(): boolean {
            let erro: boolean=false;
            let subTitle: string;

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
                  return erro;
            }

            if (!EmailValidator.validate(this.email)){
                  erro=true;
                  subTitle="Email inválido";
            }

            if (this.senha!==this.confirmaSenha){
                  erro=true;
                  subTitle="Senhas não coincidem.";

            }

            if (this.nome.length < 6){
                  erro=true;
                  subTitle="Nome muito curto.";
            }

            if (this.senha.length < 6){
                  erro=true;
                  subTitle="Senha muito curta.";
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
  