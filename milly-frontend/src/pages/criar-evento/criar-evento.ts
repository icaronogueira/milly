import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { CameraOptions, Camera } from '@ionic-native/camera';

/**
 * Generated class for the CriarEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-evento',
  templateUrl: 'criar-evento.html',
})
export class CriarEventoPage {

      data: any;
      dataMostra: string="";
      hora: any;
      horaMostra: string ="";
      eventoPara: string;
      titulo: string;
      descricao: string;
      cartaz: string;

      constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker,
                  private camera: Camera) {
      }

      ionViewCanEnter() {
      }

      adicionarImagens(){
            
      }



      selecionaData() {
            this.datePicker.show({
                  date: new Date(),
                  mode: 'date'
            }).then(
                  date => {
                        this.data=date;
                        this.dataMostra=date.toLocaleDateString("pt-BR");
                  },
                  err => console.log(err)
            );
      }

      selecionaHora() {
            this.datePicker.show({
                  date: new Date(),
                  mode: 'time'
            }).then(
                  date => {
                        this.hora = date;
                        this.horaMostra=date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit', hour12:false});
                  },
                  err => console.log(err)
            );
      }

      selecionaEventoPara(eventoPara) {
            this.eventoPara=eventoPara;
            console.log("evento para: " + this.eventoPara);
      }

      abrirCartaz(){
            
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
                  this.cartaz = base64Image;
            }, (err) => {
                  console.log(err);
            });
      }

}
