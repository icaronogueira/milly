import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
      @ViewChild(Nav) nav: Nav;

      usuario: any;

      nome: string;
      email: string;
      versaoImagem: string;
      idImagem: string;

      numeroNotificacoes: number;

      rootPage: any = 'SignIn';

      pages: Array<{title: string, component: any,icon:any,departamento:any}>;

      eAdministrador: boolean;

      constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
                  private storage: Storage, private alertCtrl: AlertController, private events: Events) {
            
                   this.initializeApp();

                   this.events.subscribe('adicionaNoMenu', (obj) => {
                        this.pages.push(obj);
                        console.log('adicionou no pages -> ');
                        console.log(this.pages);
                   });

                   this.events.subscribe('removeDoMenu', (dep) => {
                         console.log('dep');
                         console.log(dep);
                         console.log('pages');
                         console.log(this.pages);
                        this.pages = this.pages.filter(page => !(page.departamento._id==dep.departamento._id));
                   });

                   this.events.subscribe('atualizaMenu', (data, email) => {
                        if (data==='administrador') {
                              this.eAdministrador=true;
                              this.storage.get('usuario.igreja').then(igreja => {
                                    this.nome=igreja;
                              });
                              this.pages = [
                                    { title: 'Página Inicial', component: 'HomeAdministradorPage',icon:'ios-home-outline', departamento: '' },
                                    {title: 'Configurações', component: 'AdminConfiguracoesPage', icon: 'settings', departamento: ''}];
                        }
                        else {
                              this.eAdministrador=false;
                              this.pages = [
                                    { title: 'Página Inicial', component: 'Home',icon:'ios-home-outline', departamento: '' },
                                    { title: 'Notificações', component: 'Notification',icon:'ios-notifications-outline', departamento: '' },
                                    { title: 'Direção', component: 'DirecaoPage',icon:'ios-people-outline', departamento: '' }
                              ];
                        }
                   });

                   this.events.subscribe('atualiza-numero-notificacoes', (data, email) => {
                        this.numeroNotificacoes = data;
                   });

                   this.events.subscribe('atualiza-perfil', (usuario) => {
                        this.usuario=usuario;
                        this.versaoImagem=usuario.versaoImagem;
                        this.nome=this.usuario.nome;
                        this.idImagem=usuario.idImagem;
                   });
            }
      
      
      ionViewDidLoad() {
            console.log("ionViewDidLoad");
           
      }

      initializeApp() {
            this.platform.ready().then(() => {
                  this.statusBar.styleDefault();
                  this.splashScreen.hide();
            });
            this.storage.get('usuario.email').then(data => {
                  console.log(data);
                  if (data==='administrador') {
                        this.eAdministrador=true;
                        this.storage.get('usuario.igreja').then(igreja => {
                              this.nome=igreja;
                        });
                        this.pages = [
                              { title: 'Página Inicial', component: 'HomeAdministradorPage',icon:'ios-home-outline' , departamento:''},
                              {title: 'Configurações', component: 'AdminConfiguracoesPage', icon: 'settings', departamento: ''}];
                  }
                  else {
                        this.nome="Usuário qualquer";
                        this.eAdministrador=false;
                        this.pages = [ 
                              { title: 'Página Inicial', component: 'Home',icon:'ios-home-outline', departamento: '' },
                              { title: 'Notificações', component: 'Notification',icon:'ios-notifications-outline', departamento: '' },
                              { title: 'Direção', component: 'DirecaoPage',icon:'ios-people-outline', departamento: '' }
                        ];
                  }
            });
            
      }


      openPage(page) {
            // Reset the content nav to have just this page
            // we wouldn't want the back button to show in this scenario
            if (page.component==='Home' || page.component==='HomeAdministradorPage') {
                  this.nav.setRoot(page.component);
            } else {
                  if (page.component==='DepartamentoPage') {
                        this.nav.push(page.component, {
                              departamento: page.departamento
                        });
                  } else {
                        this.nav.push(page.component);
                  }
            }
            
      }
      // animate my app Function
      public animateVarible:boolean=false;

      sair(){
            this.storage.get('usuario.email').then(email => {
                  this.email = email;
                  this.storage.clear();
                  this.nav.setRoot('SignIn', {emailCadastrado: this.email});
            });
      }      

}
