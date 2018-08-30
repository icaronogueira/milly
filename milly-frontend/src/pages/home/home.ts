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
            this.mostraSpinner();
            this.storage.get('usuario.email').then(data => {
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
                                          text: 'Voltar',
                                          handler: () => {
                                                this.navCtrl.setRoot('SignIn', {emailCadastrado: this.usuario.email});
                                          }
                                    }],
                                    enableBackdropDismiss: false
                              }).present();
                       }

                  })
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
