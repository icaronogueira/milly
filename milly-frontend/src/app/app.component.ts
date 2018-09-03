import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
      @ViewChild(Nav) nav: Nav;

      nome: string;
      email: string;

      rootPage: any = 'SignIn';

      pages: Array<{title: string, component: any,icon:any}>;

      eAdministrador: boolean;

      constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
                  private storage: Storage, private alertCtrl: AlertController) {
            
            this.initializeApp();
           

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
                        this.pages = [{title: 'Configurações', component: 'Home', icon: 'settings'}];
                  }
                  else {
                        this.nome="Usuário qualquer";
                        this.eAdministrador=false;
                        this.pages = [
                              { title: 'Home', component: 'Home',icon:'ios-home-outline' },
                              { title: 'My Profile', component: 'MyProfile',icon:'ios-person-outline' },
                              { title: 'Notifications', component: 'Notification',icon:'ios-notifications-outline' },
                              { title: 'About US', component: 'AboutUs',icon:'ios-document-outline' },
                              { title: 'Contact US', component: 'ContactUs',icon:'ios-mail-outline'}
                        ];
                  }
            });
      }

      openPage(page) {
            // Reset the content nav to have just this page
            // we wouldn't want the back button to show in this scenario
            this.nav.setRoot(page);
      }
      // animate my app Function
      public animateVarible:boolean=false;

      sair(){
            this.storage.get('usuario.email').then(email => {
                  this.email = email;
                  this.storage.remove('usuario.email');
                  this.storage.remove('usuario.igreja');
                  this.nav.setRoot('SignIn', {emailCadastrado: this.email});
            });
      }      

}
