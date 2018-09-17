import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, Navbar } from 'ionic-angular';
import { DepartamentoProvider } from '../../providers/departamento/departamento';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the DepartamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-departamento',
  templateUrl: 'departamento.html',
})

export class DepartamentoPage {
      
      @ViewChild(Navbar) navBar: Navbar;

      departamento: any;
      usuario:any;
      nomeDepartamento: string;
      idDiretor: string;
      idUsuario: string;
      numeroNotificacoes: number;

      spinner: any;
      spinnerIsPresenting=false;

      constructor(public navCtrl: NavController, public navParams: NavParams, private departamentoProvider: DepartamentoProvider,
                  private storage: Storage, private loadingCtrl: LoadingController, private events: Events,
                  private usuarioProvider: UsuarioProvider) {
      }

      ionViewCanEnter() {
            this.mostraSpinner();
            
            //Ação do back button
            this.navBar.backButtonClick = () => {
                  this.mostraSpinner();
                  this.events.publish('atualiza-numero-notificacoes', this.numeroNotificacoes, '');
                  this.events.publish('atualiza-notificacoes', this.usuario._id);
                  this.escondeSpinner();
                  this.navCtrl.pop();
            }

            //inicializa usuario
            this.storage.get('usuario').then(data => {
                  this.usuario = data;
                  this.idUsuario=this.usuario._id;
            });
            
            

            //Inicializa departamento
            this.departamento = this.navParams.get('departamento');
            let dataAdicional = this.navParams.get('dataAdicional');
            if (dataAdicional == undefined) {
                  this.departamento = this.navParams.get('departamento');
                  this.nomeDepartamento = this.departamento.nome;
                  this.idDiretor=this.departamento.diretor._id;
                  this.escondeSpinner();
            } else {
                  this.departamentoProvider.getDepartamento(dataAdicional).subscribe(res => {
                        this.departamento=res.departamento;
                        this.nomeDepartamento = this.departamento.nome;
                        this.idDiretor=this.departamento.diretor._id;
                        this.escondeSpinner();
                  });
            }
            console.log("departamento");
            console.log(this.departamento);
      }

      configurarDepartamento() {
            this.navCtrl.push('AdminDepartamentosConfigPage', {
                  departamento: this.departamento
            })
      }


      ionViewWillEnter(){
            //inicializa número de notificações
            this.storage.get('usuario.notificacoes').then(data => 
                  this.numeroNotificacoes=data.filter(n => n.lida==='N').length);
      }


      irParaNotificacoes(){
            this.navCtrl.push('Notification');
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
