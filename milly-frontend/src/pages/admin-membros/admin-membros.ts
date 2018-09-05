import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { IgrejaProvider } from '../../providers/igreja/igreja';
import { Storage } from '@ionic/storage';
import { DetalhesUsuarioComponent } from '../../components/detalhes-usuario/detalhes-usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';

@IonicPage()
@Component({
  selector: 'page-admin-membros',
  templateUrl: 'admin-membros.html',
})
export class AdminMembrosPage {

      membros= [];
      items=[];
      membrosPendentes: any;
      qtdPendentes:number;
      spinner:any;

      nomeIgreja: string;
      idIgreja: string;

      constructor(public navCtrl: NavController, public navParams: NavParams, 
                  private igrejaProvider: IgrejaProvider, private loadingCtrl: LoadingController,
                  private storage: Storage, private modalCtrl: ModalController, private alertCtrl: AlertController,
                  private usuarioProvider: UsuarioProvider) {
      }

      ionViewDidLoad() {
            this.mostraSpinner();
            this.storage.get('usuario.igreja').then(data => this.nomeIgreja=data);
            this.storage.get('usuario.igreja.id').then(data => {
                  this.idIgreja=data;
                  this.igrejaProvider.getMembros(data).subscribe(res => {
                        this.escondeSpinner();
                        console.log(res);
                        this.membros = res.membros.filter((event:any) => event.permissao==="S");;
                        this.membrosPendentes = res.membros.filter((event:any) => event.permissao==="N");
                        this.items=this.membros;
                        this.qtdPendentes = this.membrosPendentes.length;
                        console.log(this.membrosPendentes);
                  });
            });
      }

      mostraDetalhes (membro) {
            let modalUsuario = this.modalCtrl.create(DetalhesUsuarioComponent, {membro: membro}, {
                  showBackdrop: true,
                  enableBackdropDismiss: true
            });
            modalUsuario.onDidDismiss(data => {
                  //dá um refresh nas listas
                  this.igrejaProvider.getMembros(this.idIgreja).subscribe(res => {
                        this.membros = res.membros.filter((event:any) => event.permissao==="S");;
                        this.membrosPendentes = res.membros.filter((event:any) => event.permissao==="N");
                        this.items=this.membros;
                        this.qtdPendentes = this.membrosPendentes.length;
                  });
            })
            modalUsuario.present();
      }

      aceitarNegarAcesso(membro: any, acao: string) {
            
            this.alertCtrl.create({
                  title: `Deseja realmente ${acao} o acesso de ${membro.nome}?`,
                  buttons: [
                        {
                              text: 'Voltar'      
                        },
                        {
                              text: 'Confirmar',
                              handler: () => {
                                    this.mostraSpinner();
                                    //confirma/nega acesso no banco
                                    this.usuarioProvider.confirmaNegaAcesso(membro, acao)
                                          .subscribe(res => {
                                                this.escondeSpinner();
                                                //alerta de confirmação
                                                let text = res.error ? res.error : res.message;
                                                this.alertCtrl.create({
                                                      title: text,
                                                      buttons: ['OK']
                                                }).present();
                                                
                                                //dá um refresh nas listas
                                                this.igrejaProvider.getMembros(this.idIgreja).subscribe(res => {
                                                      this.membros = res.membros.filter((event:any) => event.permissao==="S");;
                                                      this.membrosPendentes = res.membros.filter((event:any) => event.permissao==="N");
                                                      this.items=this.membros;
                                                      this.qtdPendentes = this.membrosPendentes.length;
                                                });


                                          });
                              }
                        }
                  ]
            }).present();
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

      getItems(ev: any) {
            this.items = this.membros;
            const val = ev.target.value;
            if (val && val.trim() != '') {
                  this.items = this.membros.filter((item) => {
                        return (this.removeAcento(item.nome).indexOf(val.toLowerCase()) > -1);
                  });
            }
      }

      removeAcento (text) {       
            text = text.toLowerCase();                                                         
            text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
            text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
            text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
            text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
            text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
            text = text.replace(new RegExp('[Ç]','gi'), 'c');
            return text;                 
      }


}
