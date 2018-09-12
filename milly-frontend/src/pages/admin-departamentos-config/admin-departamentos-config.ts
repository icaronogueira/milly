import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, LoadingController } from 'ionic-angular';
import { DepartamentoProvider } from '../../providers/departamento/departamento';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';

@IonicPage()
@Component({
  selector: 'page-admin-departamentos-config',
  templateUrl: 'admin-departamentos-config.html',
})
export class AdminDepartamentosConfigPage {

      departamento: any;

      headerText: string;      
      diretor: any;
      diretorOriginal: any;
      diretorNome: string = '';
      logo: string;

      acao: string;

      nome: string;
      igreja: string;

      spinner: any;

      buttonText: string;
      btnDisabled: boolean = false;

      constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
                  private departamentoProvider: DepartamentoProvider, private camera: Camera,
                  private storage: Storage, private notificacaoProvider: NotificacaoProvider,
                  private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
            this.events.subscribe('designaDiretor', (data, user) => {
                  this.diretor=data;
                  this.diretorNome=this.diretor.nome;
                  this.storage.get('diretor.original').then(data => this.diretorOriginal=data);
                  console.log(this.diretor);
            });
      }

      ionViewDidLoad() {
            
            this.logo="assets/img/008.png"

            this.storage.get('usuario.igreja.id').then(data => this.igreja=data);
            this.acao = this.navParams.get('acao'); 
            if (this.acao==='adicionar'){
                  this.headerText = 'Adicionar Departamento';
                  this.buttonText="CRIAR DEPARTAMENTO";
                  this.btnDisabled=false;
            } else {
                  this.departamento = this.navParams.get('departamento');
                  this.headerText = 'Configurar Departamento - ' + this.departamento.nome;
                  this.nome=this.departamento.nome;
                  this.diretorNome=this.departamento.diretor.nome;
                  this.diretor=this.departamento.diretor;
                  this.diretorOriginal=this.departamento.diretor;
                  this.logo=`http://res.cloudinary.com/nogcloud/image/upload/v${this.departamento.versaoLogo}/${this.departamento.idLogo}.jpg`;
                  console.log(this.departamento);
                  this.buttonText="SALVAR";
                  this.btnDisabled=true;
            }

           

      }


      abrirModalDiretor() {
            this.btnDisabled=false;
            this.storage.set('diretor.original',this.diretor);
            this.navCtrl.push("SearchableListPage");
      }

      salvarDepartamento(){
            if (!this.temErros()){
                  this.mostraSpinner();
                  //fazer validacoes aqui
                  let idDepartamento = this.departamento ? this.departamento._id : "";
                  this.departamentoProvider.criaDepartamento(this.nome, this.igreja, this.diretor._id, this.logo, idDepartamento)
                        .subscribe(res => {
                              this.escondeSpinner();
                              console.log(res);
                              if (!res.error) {

                                    this.alertCtrl.create({
                                          title: res.message,
                                          buttons: ['OK']
                                    }).present();


                                    //NOTIFICACOES UTÉIS
                                    if (this.acao==='adicionar' || (this.diretor._id!==this.diretorOriginal._id)) {
                                                this.notificacaoProvider.criaNotificacao(this.diretor._id,
                                                      `Você foi designado como diretor(a) do Departamento: ${this.nome}`,
                                                      "DepartamentoPage", "Administrativo", undefined, undefined, res.departamento._id)
                                                            .subscribe(res2 => console.log(res2));
                                    } 
                                    if (this.acao!=='adicionar') {
                                          if (this.diretor._id==this.diretorOriginal._id) {
                                                this.notificacaoProvider.criaNotificacao(this.diretor._id,
                                                      `A administração da igreja fez algumas modificações na estrutura do departamento: ${this.nome}`,
                                                      "DepartamentoPage", "Administrativo", undefined, undefined, res.departamento._id)
                                                      .subscribe(res2 => console.log(res2));
                                          }
                                    }
                                    if (this.acao!=='adicionar') {
                                          if (this.diretor._id!==this.diretorOriginal._id) {
                                                this.notificacaoProvider.criaNotificacao(this.diretorOriginal._id,
                                                      `Você não é mais diretor(a) do Departamento: ${this.nome}`,
                                                      "DepartamentoPage", "Administrativo", undefined, undefined, res.departamento._id)
                                                      .subscribe(res2 => console.log(res2));
                                                
                                          }
                                    }
                                    //enviar notificacoes para membros que seguem o departamento tambem

                                    this.events.publish('atualiza-departamentos','','');
                                    this.navCtrl.pop();
                              }
                        });
            }
      }

      abrirLogo(){
            
            this.btnDisabled=false;

            const options: CameraOptions = {
                  quality: 80,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE,
                  sourceType:  this.camera.PictureSourceType.PHOTOLIBRARY,
                  targetWidth: 300,
                  allowEdit: true,
                  cameraDirection: this.camera.Direction.BACK,
                  targetHeight: 300
            }
            
            this.camera.getPicture(options).then((imageData) => {
                  let base64Image = 'data:image/jpeg;base64,' + imageData;
                  console.log(base64Image);
                  this.logo = base64Image;
            }, (err) => {
                  console.log(err);
            });
      }


      temErros() {
            if (this.nome==undefined || this.nome==='' || this.diretorNome==='' || this.diretorNome==undefined) {
                  this.alertCtrl.create({
                        title: 'Preencha os campos corretamente',
                        buttons: ['OK']
                  }).present();
                  return true;
            }
            return false;
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

      mudou() {
            this.btnDisabled=false;
      }

}
