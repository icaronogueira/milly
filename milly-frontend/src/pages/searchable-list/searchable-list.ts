import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, LoadingController } from 'ionic-angular';
import { IgrejaProvider } from '../../providers/igreja/igreja';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-searchable-list',
  templateUrl: 'searchable-list.html',
})
export class SearchableListPage {

      membros: any;
      items: any;

      spinner: any;
      spinnerIsPresenting=false;
      
      constructor(public navCtrl: NavController, public navParams: NavParams, private igrejaProvider: IgrejaProvider,
                  private storage: Storage, private events: Events, private alertCtrl: AlertController,
                  private loadingCtrl: LoadingController) {
      }

      ionViewDidLoad() {
            //pegar membros ativos
            this.mostraSpinner();
            this.storage.get('usuario.igreja.id').then(data => {
                  this.igrejaProvider.getMembros(data).subscribe(res => {
                        this.escondeSpinner();
                        if (res.error) {console.log(res.error);}
                        else {
                              this.membros=res.membros.filter((event:any) => (event.permissao==="S" && event.ativo==='S')).sort(this.porNome.bind(this));
                              this.items=this.membros;
                              console.log(this.items);
                        }
                  });
            });
      }

      getItems(ev: any) {
            this.items = this.membros;
            const val = ev.target.value;
            if (val && val.trim() != '') {
                  this.items = this.membros.filter((item) => {
                        return (this.removeAcento(item.nome).indexOf(val.toLowerCase()) > -1);
                  });
            }
      }

      removeAcento (text) {       
            text = text.toLowerCase();                                                         
            text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
            text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
            text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
            text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
            text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
            text = text.replace(new RegExp('[Ç]','gi'), 'c');
            return text;                 
      }

      escolheDiretor(membro) {
            this.alertCtrl.create({
                  title: `Confirmar ${membro.nome} como diretor deste departamento?`,
                  buttons: [{
                        text: 'Não'
                  }, {
                        text: 'Sim',
                        handler: () => {
                              this.events.publish('designaDiretor', membro, '');
                              this.navCtrl.pop();
                        }
                  }]
            }).present();
      }

      porNome(a,b) {
            let ra = this.removeAcento(a.nome);
            let rb = this.removeAcento(b.nome);
            
            if (ra < rb)
              return -1;
            if (ra > rb)
              return 1;
            return 0;
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

1