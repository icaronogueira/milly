import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarEventoPage } from './criar-evento';

@NgModule({
  declarations: [
    CriarEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarEventoPage),
  ],
})
export class CriarEventoPageModule {}
