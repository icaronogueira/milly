import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DepartamentoProvider } from '../../providers/departamento/departamento';

/**
 * Generated class for the AdminDepartamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-departamentos',
  templateUrl: 'admin-departamentos.html',
})
export class AdminDepartamentosPage {

      nomeIgreja: string;
      idIgreja: string;
      departamentos: any;

      spinner:any;

      constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
                  private departamentoProvider: DepartamentoProvider, private loadingCtrl: LoadingController,
                  private events: Events, private alertCtrl: AlertController) {
                  
                  this.events.subscribe('atualiza-departamentos', (param1, parm2) => {
                        this.mostraSpinner();
                        this.departamentoProvider.getDepartamentos(this.idIgreja).subscribe(res => {
                              this.escondeSpinner();
                              console.log(res.departamentos);
                              if (!res.error) {
                                    this.departamentos = res.departamentos;
                              }
                        });
                  });
               
      }

      ionViewCanEnter() {
            
      }

      ionViewDidLoad() {
            this.storage.get('usuario.igreja').then(data => this.nomeIgreja=data);
            this.mostraSpinner();
            this.storage.get('usuario.igreja.id').then(data => {
                  this.idIgreja=data;
                  this.departamentoProvider.getDepartamentos(this.idIgreja).subscribe(res => {
                        this.escondeSpinner();
                        console.log(res.departamentos);
                        if (!res.error) {
                              this.departamentos = res.departamentos;
                        }
                  });
            });
      }

      removeDepartamento(departamento) {
            this.alertCtrl.create({
                  title: 'Confirmar a remoção do departamento ' + departamento.nome + '?',
                  buttons: [{text: 'Não'}, {
                        text: 'Sim',
                        handler: () => {
                              this.mostraSpinner();
                              this.departamentoProvider.removeDepartamento(departamento._id).subscribe(res => {
                                    this.escondeSpinner();
                                    let text = res.error ? res.error : res.message;
                                    this.events.publish('atualiza-departamentos','','');
                                    this.alertCtrl.create({
                                          title: text,
                                          buttons: ['OK']
                                    }).present();
                              });
                        }
                  }]
            }).present();
      }

      paraConfiguracaoDepartamento(acao, departamento?) {
            this.navCtrl.push("AdminDepartamentosConfigPage", {
                  acao: acao,
                  departamento: departamento ? departamento : undefined
            });
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
