import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, LoadingController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { CameraOptions, Camera } from '@ionic-native/camera';
import {GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,
      MarkerOptions,Marker} from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import moment from 'moment-timezone';
import { EventoProvider } from '../../providers/evento/evento';


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
      spinner:any;
      spinnerIsPresenting=false;

      departamento: any;
      map: GoogleMap;
      data: any;
      dataMostra: string="";
      hora: any;
      horaMostra: string ="";
      eventoPara: string='todos';
      titulo: string;
      descricao: string;
      cartaz: string;
      contas=[];
      midias=[];
      doacoes=[];
      departamentos=[];
      banco: string;
      agencia: string;
      titular: string;
      valor: number;

      constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker,
                  private camera: Camera, private events: Events, private storage: Storage, private alertCtrl: AlertController,
                  private eventoProvider: EventoProvider, private loadingCtrl: LoadingController) {
                  moment.locale('pt-BR');
                  moment.tz.setDefault('America/Manaus');
                  
                  this.events.subscribe('contas-transferencia', (contas) => {
                        this.contas=contas;
                  });
                  this.events.subscribe('pedidos-doacoes', (doacoes) => {
                        this.doacoes=doacoes;
                  });
                  this.events.subscribe('departamentos-participantes', (departamentos) => {
                        this.departamentos=departamentos;
                  });
                  this.events.subscribe('adicionar-midia', (midias) => {
                        this.midias=midias;
                  });
      }

      ionViewCanEnter() {
            this.cartaz='../../assets/img/adicionarcartaz.png';
            this.departamento=this.navParams.get('departamento');
      }

      criarEvento () {

            

            if (!this.temErro()) {
                  this.mostraSpinner();
                  this.eventoProvider.criaEvento(this.departamento._id, this.eventoPara, this.cartaz, this.titulo,
                        this.data, this.hora, this.descricao, this.contas, this.departamentos, this.doacoes)
                        .subscribe(res => {
                              console.log("resposta ao criar evento");
                              console.log(res);

                              if (this.midias.length>0) {
                                    this.midias.forEach(midia => {
                                          this.eventoProvider.adicionaImagem(res.evento._id, midia)
                                                .subscribe(res => {
                                                      console.log(res);
                                                });
                                    });
                              }
                              this.escondeSpinner();
                        
                        });
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
                        this.hora = moment(date).local().format("HH:mm");
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
                  quality: 50,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE,
                  sourceType:  this.camera.PictureSourceType.PHOTOLIBRARY,
                  allowEdit: true,
                  cameraDirection: this.camera.Direction.BACK,
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