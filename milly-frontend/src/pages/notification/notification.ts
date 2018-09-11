import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class Notification {

      notificacoes: any;
      numeroNotificacoes: number;

      spinner: any;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
                  private notificacaoProvider: NotificacaoProvider, private loadingCtrl: LoadingController,
                  private events: Events) {
      }

      // go to another page
      ionViewDidLoad(){
            this.storage.get('usuario.notificacoes').then(data => {
                  this.notificacoes=data;
                  console.log(this.notificacoes);
                  this.numeroNotificacoes = this.notificacoes.filter(element => element.lida==='N').length;
            });
            
      }

      clicaNotificacao(notificacao) {

            //marcar notificacao como lida
            //atualizar badges
            //ir para a página componente
            this.mostraSpinner();
            this.notificacaoProvider.leNotificacao(notificacao._id).subscribe(res => {
                  this.escondeSpinner();
                  console.log(res);
                  this.navCtrl.push(notificacao.componente);
            });

      }

      lerTodas(){
            this.storage.get('usuario.id').then(data => {
                  this.notificacaoProvider.leTodas(data).subscribe(res => {
                        console.log(res.notificacoes);
                        this.notificacoes=res.notificacoes;
                        this.numeroNotificacoes = this.notificacoes.filter(element => element.lida==='N').length;
                        this.events.publish('atualiza-numero-notificacoes', this.numeroNotificacoes, '');
                  });
            });
      }



      classLido(lida) {
            if (lida==='S') {
                  return 'item-lido';
            }
            return '';
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
