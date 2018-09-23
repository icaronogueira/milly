import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VideoPlayer } from '@ionic-native/video-player';
import {StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media';

@IonicPage()
@Component({
  selector: 'page-adicionar-midia',
  templateUrl: 'adicionar-midia.html',
})
export class AdicionarMidiaPage {
      
      @ViewChild(Navbar) navBar: Navbar;

      lista=[];
      listaVideo=[];

      constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
                        private camera: Camera, private videoPlayer: VideoPlayer,
                        private streamingMedia: StreamingMedia) {
      }

      ionViewDidLoad() {
            this.lista= this.navParams.get('lista') ? this.navParams.get('lista') : [];
      }
      ionViewCanEnter(){
            this.navBar.backButtonClick = () => {
                  this.events.publish('adicionar-midia',this.lista);
                  this.navCtrl.pop();
            }
      }

      carregarImagem(){
            const options: CameraOptions = {
                  quality: 80,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE,
                  sourceType:  this.camera.PictureSourceType.PHOTOLIBRARY,
                  // targetWidth: 300,
                  cameraDirection: this.camera.Direction.BACK
                  // targetHeight: 300
            }
            
            this.camera.getPicture(options).then((imageData) => {
                  let base64Image = 'data:image/jpeg;base64,' + imageData;
                  console.log(base64Image);
                  this.lista.push(base64Image);
            }, (err) => {
                  console.log(err);
            });
      }

      remover(item) {
            this.lista=this.lista.filter(element => element != item);
      }

      // carregarVideo(){
      //       const options: CameraOptions = {
      //             quality: 50,
      //             mediaType: this.camera.MediaType.VIDEO,
      //             destinationType: this.camera.DestinationType.FILE_URI,
      //             sourceType:  this.camera.PictureSourceType.PHOTOLIBRARY,
      //       }
            
      //       this.camera.getPicture(options).then((videoData) => {
      //             this.listaVideo.push(videoData);
      //       }, (err) => {
      //             console.log(err);
      //       });
      // }

      // play(video) {
      //       // let videoOpts = {volume: 1.0};
      //       // this.videoPlayer.play('file://'+video).then(()=> {
      //       //       console.log('video completed');
      //       // }).catch(err => console.log(err));
      //       let options: StreamingVideoOptions = {
      //             successCallback: () => { console.log('Video played') },
      //             errorCallback: (e) => { console.log('Error streaming') },
      //             orientation: 'landscape',
      //             shouldAutoClose: true,
      //             controls: false
      //       };

      //       this.streamingMedia.playVideo(video, options);
      // }
}
