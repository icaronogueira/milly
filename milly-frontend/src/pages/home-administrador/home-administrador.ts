import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeAdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-administrador',
  templateUrl: 'home-administrador.html',
})
export class HomeAdministradorPage {
      items=[
            {img:'assets/img/004.png',title:'International sports tournament'},
            {img:'assets/img/002.png',title:'International sports tournament'},
            {img:'assets/img/003.png',title:'International sports tournament'}
      ];

      constructor(public navCtrl: NavController, public navParams: NavParams) {
      }

      ionViewDidLoad() {
      console.log('ionViewDidLoad HomeAdministradorPage');
      }

}
