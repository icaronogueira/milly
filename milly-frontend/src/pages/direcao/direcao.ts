import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DepartamentoProvider } from '../../providers/departamento/departamento';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';

/**
 * Generated class for the DirecaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-direcao',
  templateUrl: 'direcao.html',
})
export class DirecaoPage {

      nomeIgreja: string;
      idIgreja: string;
      numeroNotificacoes: number;

      departamentos: any;
      departamentosQueSegue:any = [];
      usuario: any;

      spinner: any;
      spinnerIsPresenting=false;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
                  private departamentoProvider: DepartamentoProvider, private loadingCtrl: LoadingController,
                  private notificacaoProvider: NotificacaoProvider) {
      }

      ionViewDidLoad() {
            this.storage.get('usuario.notificacoes').then(data => 
                  this.numeroNotificacoes=data.filter(n => n.lida==='N').length);
            

            this.storage.get('usuario').then(data => {
                  this.nomeIgreja=data.igreja.nome;
                  this.idIgreja=data.igreja._id;
                  this.usuario=data;
                  this.departamentosQueSegue=this.usuario.segue;
                  console.log(this.departamentosQueSegue);
                  //pega departamentos
                  this.mostraSpinner();
                  this.departamentoProvider.getDepartamentos(this.idIgreja).subscribe(res => {
                        this.escondeSpinner();
                        this.departamentos=res.departamentos;
                  });
            });

            this.storage.get('segue.departamentos').then(data => {
                  if (data) {
                        this.departamentosQueSegue = data;
                  }
            });

            
      }

      ionViewWillAppear(){
            console.log("will appear");
      }

      seguirDepartamento(departamento) {
            this.departamentoProvider.seguirDepartamento(this.usuario, departamento).subscribe(res => {
                  this.departamentosQueSegue.push({
                        departamento: departamento._id
                  });
                  this.storage.set('segue.departamentos', this.departamentosQueSegue);

                  this.notificacaoProvider.criaNotificacao(departamento.diretor._id,
                        `Começou a seguir ${departamento.nome}`,
                        "DepartamentoPage", this.usuario.nome, this.usuario.idImagem,
                        this.usuario.versaoImagem, departamento._id)
                        .subscribe(res => console.log(res));


                  console.log(this.departamentosQueSegue);
            });
      }

      deixarSeguirDepartamento(departamento) {
            this.departamentoProvider.deixarSeguirDepartamento(this.usuario, departamento).subscribe(res => {
                  this.departamentosQueSegue = this.departamentosQueSegue.filter(e => e.departamento !== departamento._id);
                  this.storage.set('segue.departamentos', this.departamentosQueSegue);
                  console.log(this.departamentosQueSegue);
            });
      }


      enviarMensagem(id, nome) {
            this.navCtrl.push('EnviarMensagemPage', {
                  id: id,
                  nome: nome,
                  remetente: this.usuario
            });
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


      toggleSection(i){
            this.departamentos[i].open = !this.departamentos[i].open;
      }

      irParaNotificacoes(){
            this.navCtrl.push('Notification');
      }

      paginaDepartamento(departamento) {
            this.navCtrl.push("DepartamentoPage", {departamento: departamento});
      }

      segueDepartamento(departamento){
            let segue=false;
            this.departamentosQueSegue.forEach(element => {
                  if (element.departamento === departamento._id) {
                        segue=true;
                  }
            });
            return segue;
      }
      

}
