import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { DepartamentoProvider } from '../../providers/departamento/departamento';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';
import { IgrejaProvider } from '../../providers/igreja/igreja';

@IonicPage()
@Component({
  selector: 'page-admin-departamentos-config',
  templateUrl: 'admin-departamentos-config.html',
})
export class AdminDepartamentosConfigPage {

      departamento: any;

      headerText: string;
      membroDiretoria: any;      
      diretor: any;
      diretorOriginal: any;
      diretorNome: string = '';
      membroDiretoriaNome: string = '';
      funcaoDiretoria: string = '';
      membrosQueSeguem: any;
      diretoria: any;

      logo: string;

      acao: string;

      nome: string;
      igreja: string;
      eAdministrador: boolean;
      spinner: any;
      spinnerIsPresenting=false;

      buttonText: string;
      btnDisabled: boolean = false;

      
      constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
                  private departamentoProvider: DepartamentoProvider, private camera: Camera,
                  private storage: Storage, private notificacaoProvider: NotificacaoProvider,
                  private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                  private toastCtrl: ToastController, private igrejaProvider: IgrejaProvider) {
            this.events.subscribe('designaDiretoria', (data, aux) => {
                  this.membroDiretoria=data;
                  this.membroDiretoriaNome=this.membroDiretoria.nome;
                  console.log(this.membroDiretoria);
            });
            this.events.subscribe('designaDiretor', (data, aux) => {
                  this.diretor=data;
                  this.diretorNome=this.diretor.nome;
                  this.storage.get('diretor.original').then(data => this.diretorOriginal=data);
                  console.log(this.diretor);
            });
      }

      ionViewDidLoad() {
            
            this.logo="assets/img/008.png"

            this.storage.get('usuario.igreja.id').then(data => this.igreja=data);
            this.storage.get('usuario.email').then(data => {
                  this.eAdministrador=(data === 'administrador');
            });
            this.acao = this.navParams.get('acao'); 
            if (this.acao==='adicionar'){
                  this.headerText = 'Adicionar Departamento';
                  this.buttonText="CRIAR DEPARTAMENTO";
                  this.btnDisabled=false;
            } else {
                  this.departamento = this.navParams.get('departamento');
                  this.headerText = 'Configurar Departamento - ' + this.departamento.nome;
                  this.nome=this.departamento.nome;
                  this.diretorNome=this.departamento.diretor.nome;
                  this.diretor=this.departamento.diretor;
                  this.diretorOriginal=this.departamento.diretor;
                  this.diretoria = this.departamento.diretoria;
                  console.log(this.diretoria);
                  this.logo=`http://res.cloudinary.com/nogcloud/image/upload/v${this.departamento.versaoLogo}/${this.departamento.idLogo}.jpg`;
                  console.log(this.departamento);
                  this.buttonText="SALVAR";
                  this.btnDisabled=true;


                  //filtra membros que seguem aquele departamento
                  this.mostraSpinner();
                  this.igrejaProvider.getMembros(this.departamento.igreja).subscribe(res => {
                        this.membrosQueSeguem = res.membros.filter(element => {
                              let segue=false;
                              element.segue.forEach(dep => {
                                    if (dep.departamento==this.departamento._id) {
                                          segue=true;
                                    }
                              });
                              return segue;
                        });
                        console.log('membros que seguem');
                        console.log(this.membrosQueSeguem);
                        this.escondeSpinner();
                  });
            }

           

      }


      abrirModalDiretor() {
            if (this.eAdministrador) {
                  this.btnDisabled=false;
                  this.storage.set('diretor.original',this.diretor);
                  this.navCtrl.push("SearchableListPage");
            } else {
                  this.navCtrl.push("SearchableListPage", {
                        requisicao: 'diretoria',
                        diretor: this.departamento.diretor._id
                  });
            }
      }

      salvarDepartamento(){
            if (!this.temErros()){
                  this.mostraSpinner();
                  //fazer validacoes aqui
                  let idDepartamento = this.departamento ? this.departamento._id : "";
                  this.departamentoProvider.criaDepartamento(this.nome, this.igreja, this.diretor._id, this.logo, idDepartamento)
                        .subscribe(res => {
                              this.escondeSpinner();
                              console.log(res);
                              if (!res.error) {

                                    this.toastCtrl.create({
                                          message: res.message,
                                          duration: 3000
                                    }).present();


                                    // ********* NOTIFICAÇÕES ***********
                                    if (this.eAdministrador) {

                                          //NOTIFICACOES UTÉIS
                                          if (this.acao==='adicionar' || (this.diretor._id!==this.diretorOriginal._id)) {
                                                      this.notificacaoProvider.criaNotificacao(this.diretor._id,
                                                            `Você foi designado como diretor(a) do Departamento: ${this.nome}`,
                                                            "DepartamentoPage", "Administrativo", this.departamento.idLogo, this.departamento.versaoLogo, res.departamento._id)
                                                                  .subscribe(res2 => console.log(res2));
                                          } 
                                          if (this.acao!=='adicionar') {
                                                if (this.diretor._id==this.diretorOriginal._id) {

                                                      let enviarpara=[];
                                                      enviarpara.push(this.diretor._id);
                                                      this.departamento.diretoria.forEach(element => enviarpara.push(element.usuario._id));
                                                      this.membrosQueSeguem.forEach(element => enviarpara.push(element._id));
                                                      enviarpara = enviarpara.filter((elem, index, self) => index === self.indexOf(elem));

                                               
                                                      enviarpara.forEach(element => {
                                                            this.notificacaoProvider.criaNotificacao(element,
                                                                  `A administração da igreja fez algumas modificações na estrutura do departamento: ${this.nome}`,
                                                                  "DepartamentoPage", "Administrativo", this.departamento.idLogo, this.departamento.versaoLogo, res.departamento._id)
                                                                  .subscribe(res2 => console.log(res2));
                                                      });
                                                    
                                                }
                                          }
                                          if (this.acao!=='adicionar') {
                                                if (this.diretor._id!==this.diretorOriginal._id) {
                                                      this.notificacaoProvider.criaNotificacao(this.diretorOriginal._id,
                                                            `Você não é mais diretor(a) do Departamento: ${this.nome}`,
                                                            "DepartamentoPage", "Administrativo", undefined, undefined, res.departamento._id)
                                                            .subscribe(res2 => console.log(res2));
                                                      
                                                }
                                          }
                                    } else {
                                          //notificacoes se quem fez as modificacoes foi o diretor
                                    
                                          let enviarpara=[];
                                          this.departamento.diretoria.forEach(element => enviarpara.push(element.usuario._id));
                                          this.membrosQueSeguem.forEach(element => enviarpara.push(element._id));
                                          enviarpara = enviarpara.filter((elem, index, self) => index === self.indexOf(elem));

                                          enviarpara.forEach(element => {
                                                this.notificacaoProvider.criaNotificacao(element,
                                                      `${this.diretor.nome} fez algumas modificações na estrutura do departamento: ${this.nome}`,
                                                      "DepartamentoPage", this.diretor.nome, this.departamento.idLogo, this.departamento.versaoLogo, res.departamento._id)
                                                      .subscribe(res2 => console.log(res2));
                                          });

                                    }
                                    

                                    this.events.publish('atualiza-departamentos','','');
                                    this.navCtrl.pop();
                              }
                        });
            }
      }

      adicionarDiretoria(){
            //valida campos
            let funcao = this.funcaoDiretoria;
            if (this.funcaoDiretoria!=="" && this.funcaoDiretoria!==undefined &&
                   this.membroDiretoriaNome!=="" && this.membroDiretoriaNome!==undefined) {  
                  this.mostraSpinner();
                  //adiciona membro na direcao
                  this.departamentoProvider.adicionaDiretoria(this.departamento._id,
                        this.funcaoDiretoria, this.membroDiretoria._id).subscribe(res => {
                              
                              //recupara lista de diretoria atualizada para mostrar
                              this.departamentoProvider.getDepartamento(this.departamento._id).subscribe(res => {
                                    this.escondeSpinner();
                                    this.departamento=res.departamento;
                                    this.diretoria=this.departamento.diretoria;
                                    console.log(this.diretoria);

                                    // ****** envia notificacao
                                    let enviarpara=[];
                                    this.departamento.diretoria.forEach(element => enviarpara.push(element.usuario._id));
                                    this.membrosQueSeguem.forEach(element => enviarpara.push(element._id));
                                    enviarpara = enviarpara.filter((elem, index, self) => index === self.indexOf(elem));
                                    this.mostraSpinner();

                                    enviarpara.forEach(element => {
                                          console.log('Funcao diretora');
                                          console.log(this.funcaoDiretoria);
                                          let text=(element!==this.membroDiretoria._id) ?
                                                this.diretor.nome+" adicionou "+this.membroDiretoria.nome+" como "+funcao+" do departamento "+this.nome :
                                                this.diretor.nome+" adicionou você como "+funcao+" do departamento "+this.nome;
                                          this.notificacaoProvider.criaNotificacao(element, text, "DepartamentoPage", this.diretor.nome,
                                                 this.departamento.idLogo, this.departamento.versaoLogo, res.departamento._id)
                                                .subscribe(res2 => console.log(res2));
                                    });
                                    this.escondeSpinner();

                              });

                              //limpa camps
                              this.membroDiretoriaNome='';
                              this.funcaoDiretoria='';

                              //apresenta mensagem
                              if (!res.error) {
                                    this.toastCtrl.create({
                                          message: res.message,
                                          duration: 3000
                                    }).present();
                              }
                        });
            } else {
                  this.alertCtrl.create({
                        title: 'Preencha os campos corretamente.',
                        buttons: ['OK']
                  }).present();
            }

      }

      removeDiretoria(membro) {
            this.mostraSpinner();
                  //remove membro da direcao
                  this.departamentoProvider.removeDiretoria(this.departamento._id,
                        membro.funcao, membro.usuario._id).subscribe(res => {
                              //recupera lista de diretoria atualizada para mostrar
                              this.departamentoProvider.getDepartamento(this.departamento._id).subscribe(res => {
                                    this.escondeSpinner();
                                    this.departamento=res.departamento;
                                    this.diretoria=this.departamento.diretoria;
                                    console.log(this.diretoria);

                                     // ****** envia notificacao
                                     let enviarpara=[];
                                     this.departamento.diretoria.forEach(element => enviarpara.push(element.usuario._id));
                                     this.membrosQueSeguem.forEach(element => enviarpara.push(element._id));
                                     enviarpara = enviarpara.filter((elem, index, self) => index === self.indexOf(elem));
                                     this.mostraSpinner();
                                     enviarpara.forEach(element => {
                                           let text=(element!==membro.usuario._id) ?
                                                 this.diretor.nome+" removeu "+membro.usuario.nome+" como "+membro.funcao+" do departamento "+this.nome :
                                                 this.diretor.nome+" removeu você como "+membro.funcao+" do departamento "+this.nome;
                                           this.notificacaoProvider.criaNotificacao(element, text, "DepartamentoPage", this.diretor.nome,
                                                  this.departamento.idLogo, this.departamento.versaoLogo, res.departamento._id)
                                                 .subscribe(res2 => console.log(res2));
                                     });
                                     this.escondeSpinner();
                              });

                              //apresenta mensagem
                              if (!res.error) {
                                    this.toastCtrl.create({
                                          message: res.message,
                                          duration: 3000
                                    }).present();
                              }
                        });
      }

      abrirLogo(){
            
            this.btnDisabled=false;

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
            if (!this.spinnerIsPresenting) {
                  this.spinnerIsPresenting=true;
                  this.spinner.present();
            }    
      }

      escondeSpinner(){
            this.spinner.dismiss();
            this.spinnerIsPresenting=false;
      }

      mudou() {
            this.btnDisabled=false;
      }

}
