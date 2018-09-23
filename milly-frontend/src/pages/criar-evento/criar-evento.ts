import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { CameraOptions, Camera } from '@ionic-native/camera';
import {GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,
      MarkerOptions,Marker} from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { TemplateParseError } from '@angular/compiler';

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
      departamento: any;
      map: GoogleMap;
      data: any;
      dataMostra: string="";
      hora: any;
      horaMostra: string ="";
      eventoPara: string;
      titulo: string;
      descricao: string;
      cartaz: string;
      contas=[];
      midias=[];
      doacoes=[];
      departamentos=[];
      banco: string;
      agencia: string;
      conta: string;
      titular: string;
      valor: number;

      constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker,
                  private camera: Camera, private events: Events, private storage: Storage, private alertCtrl: AlertController) {
                  
                  this.events.subscribe('contas-transferencia', (contas) => {
                        this.contas=contas;
                        console.log("contas para transferencia");
                        console.log(this.contas);
                  });
                  this.events.subscribe('pedidos-doacoes', (doacoes) => {
                        this.doacoes=doacoes;
                        console.log("pedidoa doacoes");
                        console.log(this.doacoes);
                  });
                  this.events.subscribe('departamentos-participantes', (departamentos) => {
                        this.departamentos=departamentos;
                        console.log("departamentos participantes");
                        console.log(this.departamentos);
                  });
                  this.events.subscribe('adicionar-midia', (midias) => {
                        this.midias=midias;
                        console.log("Midias");
                        console.log(this.midias);
                  });
      }

      ionViewCanEnter() {
      }

      criarEvento () {
            if (!this.temErro()) {

            }
      }


      adicionarImagens(){
            this.navCtrl.push("AdicionarMidiaPage", {
                  lista: this.midias
            });
      }

      adicionarPagamento() {
            this.navCtrl.push("ListaBancariaPage", {
                  lista: this.contas
            });
      }

      adicionarLocalizacao() {
            let mapOptions: GoogleMapOptions = {
                  camera: {
                        target: {
                              lat: 43.0741904,
                              lng: -89.3809802
                        },
                        zoom: 18,
                        tilt: 30
                  }
                };
            
            this.map = GoogleMaps.create('map_canvas', mapOptions);
            
      }

      marcarDepartamentos(){
            this.departamento=this.navParams.get('departamento');
            this.storage.get('usuario.igreja.id').then(res => {
                  this.navCtrl.push("MarcarDepartamentosPage",{
                        departamento: this.departamento,
                        idIgreja: res,
                        lista: this.departamentos
                  });
            });
      }

      pedirDoacoes(){
            this.navCtrl.push('PedirDoacoesPage', {
                  lista: this.doacoes
            });
      }


      selecionaData() {
            this.datePicker.show({
                  date: new Date().getTimezoneOffset(),
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
                  date: new Date().getTimezoneOffset(),
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

      temErro() {
            let erro=false;
            let mensagem = '';
            let today = new Date().getTimezoneOffset();
            console.log('today');
            console.log(today);
            console.log("data");
            console.log(this.data);
            console.log("horario");
            console.log(this.hora);
            // if (! (this.data >= today)) {
            //       console.log('this.data');
            //       console.log(this.data);
            //       erro=true;
            //       mensagem='Data anterior à de hoje.';
            // }
            if (this.data==='' || this.data==undefined) {
                  erro=true;
                  mensagem='Data não preenchida.';
            }
            
            if (this.hora==='' || this.hora==undefined) {
                  erro=true;
                  mensagem='Horário não preenchido.';
            }
            if (this.titulo==='' || this.titulo==undefined) {
                  erro=true;
                  mensagem='Preencha o título do evento.';
            }


            if (erro) {
                  this.alertCtrl.create({
                        title: mensagem,
                        buttons: ['OK']
                  }).present();
            }
            return erro;
      }

}