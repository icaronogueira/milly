import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IgrejaProvider } from '../providers/igreja/igreja';
import { HttpClientModule } from '@angular/common/http';



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
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,config),
    IonicImageViewerModule,
    HttpClientModule
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IgrejaProvider
  ]
})
export class AppModule {}
