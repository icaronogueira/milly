import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { IgrejaProvider } from '../../providers/igreja/igreja';
import { Storage } from '@ionic/storage';
import { DetalhesUsuarioComponent } from '../../components/detalhes-usuario/detalhes-usuario';

@IonicPage()
@Component({
  selector: 'page-admin-membros',
  templateUrl: 'admin-membros.html',
})
export class AdminMembrosPage {

      membros= [];
      membrosPendentes: any;
      qtdPendentes:number;
      spinner:any;

      nomeIgreja: string;

      constructor(public navCtrl: NavController, public navParams: NavParams, 
                  private igrejaProvider: IgrejaProvider, private loadingCtrl: LoadingController,
                  private storage: Storage, private modalCtrl: ModalController) {
      }

      ionViewDidLoad() {
            this.mostraSpinner();
            this.storage.get('usuario.igreja').then(data => this.nomeIgreja=data);
            this.storage.get('usuario.igreja.id').then(data => {
                  this.igrejaProvider.getMembros(data).subscribe(res => {
                        this.escondeSpinner();
                        console.log(res);
                        this.membros = res.membros.filter((event:any) => event.permissao!=="N");;
                        this.membrosPendentes = res.membros.filter((event:any) => event.permissao==="N");
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
                  console.log(data);
            })
            modalUsuario.present();
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
