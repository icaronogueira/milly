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

      headerText: string;      
      diretor: any;
      diretorNome: string = '';
      logo: string;

      nome: string;
      igreja: string;

      spinner: any;


      constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
                  private departamentoProvider: DepartamentoProvider, private camera: Camera,
                  private storage: Storage, private notificacaoProvider: NotificacaoProvider,
                  private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
            this.events.subscribe('designaDiretor', (data, user) => {
                  this.diretor=data;
                  this.diretorNome=this.diretor.nome;
                  console.log(this.diretor);
            });
      }

      ionViewDidLoad() {
            
            this.logo="assets/img/008.png"

            this.storage.get('usuario.igreja.id').then(data => this.igreja=data);

            if (this.navParams.get('acao')==='adicionar'){
                  this.headerText = 'Adicionar Departamento';
            }

           

      }


      abrirModalDiretor() {
            this.navCtrl.push("SearchableListPage");
      }

      salvarDepartamento(){
            if (!this.temErros()){
                  this.mostraSpinner();
                  //fazer validacoes aqui
                  this.departamentoProvider.criaDepartamento(this.nome, this.igreja, this.diretor._id, this.logo)
                        .subscribe(res => {
                              this.escondeSpinner();
                              console.log(res);
                              if (!res.error) {

                                    this.alertCtrl.create({
                                          title: 'Departamento criado com sucesso.',
                                          buttons: ['OK']
                                    }).present();

                                    this.notificacaoProvider.criaNotificacao(this.diretor._id,
                                          `Você foi designado como diretor(a) do Departamento: ${this.nome}`,
                                          "PaginaDepartamento").subscribe(res => console.log(res));


                                    this.events.publish('atualiza-departamentos','','');
                                    this.navCtrl.pop();
                              }
                        });
            }
      }

      abrirLogo(){
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

}
