import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicStorageModule } from '@ionic/storage'
import { IgrejaProvider } from '../providers/igreja/igreja';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { Camera } from '@ionic-native/camera';
import { ComponentsModule } from '../components/components.module';
import { NotificacaoProvider } from '../providers/notificacao/notificacao';
import { FormsModule } from '@angular/forms';
import { DepartamentoProvider } from '../providers/departamento/departamento';
import { MensagemProvider } from '../providers/mensagem/mensagem';
import { DatePicker } from '@ionic-native/date-picker';


var config = {
      backButtonText: '',
      iconMode: 'ios',
      mode:'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'ios',
    };

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp,config),
      IonicImageViewerModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      ComponentsModule,
      FormsModule
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IgrejaProvider,
    UsuarioProvider,
    Camera,
    NotificacaoProvider,
    DepartamentoProvider,
    MensagemProvider,
    DatePicker
  ]
})
export class AppModule {}
