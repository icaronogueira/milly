import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { IgrejaProvider } from '../../providers/igreja/igreja';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AdminMembrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-membros',
  templateUrl: 'admin-membros.html',
})
export class AdminMembrosPage {

      membros: any;
      
      spinner:any;

      constructor(public navCtrl: NavController, public navParams: NavParams, 
                  private igrejaProvider: IgrejaProvider, private loadingCtrl: LoadingController,
                  private storage: Storage) {
      }

      ionViewDidLoad() {
            this.mostraSpinner();
            this.storage.get('usuario.igreja.id').then(data => {
                  this.igrejaProvider.getMembros(data).subscribe(res => {
                        this.escondeSpinner();
                        console.log(res);
                  });
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
