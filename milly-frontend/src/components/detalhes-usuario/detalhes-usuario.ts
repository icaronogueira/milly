import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the DetalhesUsuarioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detalhes-usuario',
  templateUrl: 'detalhes-usuario.html'
})
export class DetalhesUsuarioComponent {
      
      membro: any;

      constructor(params: NavParams, public viewCtrl: ViewController) {
            this.membro=params.get('membro');
            console.log(this.membro);
      }

      aceitar() {
            let data = {'foo':'bar'};
            this.viewCtrl.dismiss(data);
      }

      negar() {
            let data = {'foo':'bar'};
            this.viewCtrl.dismiss(data);
      }

      voltar() {
            let data = {'foo':'bar'};
            this.viewCtrl.dismiss(data);
      }

}
