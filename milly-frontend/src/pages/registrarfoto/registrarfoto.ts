import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IgrejaProvider } from '../../providers/igreja/igreja';

/**
 * Generated class for the RegistrarfotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrarfoto',
  templateUrl: 'registrarfoto.html',
})
export class RegistrarfotoPage {
      
      nome: string;
      email: string;
      senha: string;
      igreja: any;

      spinner: any;

      imagem: string;

      constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
                  private loadingCtrl: LoadingController, private usuarioProvider: UsuarioProvider,
                  private camera: Camera, private igrejaProvider: IgrejaProvider) {
      }

      ionViewDidLoad() {

            this.imagem = "assets/img/avatar-user.jpeg";
            this.nome = this.navParams.get('nome');
            this.email = this.navParams.get('email');
            this.senha = this.navParams.get('senha');
            this.igrejaProvider.getIgreja(this.navParams.get('igreja'))
                  .subscribe(res => {
                        if (res.error) {
                              console.log(res.error);
                        }
                        this.igreja = res.igreja;
                  });

      }

      tiraCarregaFoto(tiraCarrega: string) {
            
            let source = tiraCarrega==='tira' ? this.camera.PictureSourceType.CAMERA :
                  this.camera.PictureSourceType.PHOTOLIBRARY;

            const options: CameraOptions = {
                  quality: 80,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE,
                  sourceType: source,
                  targetWidth: 300,
                  allowEdit: true,
                  cameraDirection: this.camera.Direction.BACK,
                  targetHeight: 300
            }
            
            this.camera.getPicture(options).then((imageData) => {
                  let base64Image = 'data:image/jpeg;base64,' + imageData;
                  console.log(base64Image);
                  this.imagem = base64Image;
            }, (err) => {
                  console.log(err);
            });
      }


    

      voltarParaCadastro(){
            this.navCtrl.pop();
      }

      finalizarCadastro(){

            this.alertCtrl.create({
                  title: 'Deseja finalizar o cadastro?',
                  message: 'Certifique-se se as informações estão corretas.',
                  buttons: [
                    {
                      text: 'Confirmar',
                      handler: () => {
                        this.cadastrarMembro();
                      }
                    },
                    {
                      text: 'Voltar',
                      handler: () => {
                      }
                    }
                  ]
                }).present();


            
      }

      cadastrarMembro(){
            
            this.mostraSpinner();
            this.usuarioProvider.cadastraUsuario(this.nome, this.email, this.igreja._id, this.senha, this.imagem)
                  .subscribe(res => {
                        console.log(res);
                        this.escondeSpinner();
                        if (res.error) {
                              this.alertCtrl.create({
                                    title: "Erro no cadastro",
                                    subTitle: res.error,
                                    buttons: ["OK"]
                              }).present();
                        } else {
                              this.alertCtrl.create({
                                    title: 'Cadastrado com sucesso',
                                    subTitle: 'Soliticação de acesso enviada para a administração de sua igreja. Aguarde.',
                                    buttons: [{
                                          text: "OK",
                                          handler: () => {
                                                this.navCtrl.setRoot("SignIn", {emailCadastrado: this.email});
                                          }
                                    }],
                                    enableBackdropDismiss: false
                              }).present();
                        }
                              
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
