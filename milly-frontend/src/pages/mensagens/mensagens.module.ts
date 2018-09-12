import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensagensPage } from './mensagens';

@NgModule({
  declarations: [
    MensagensPage,
  ],
  imports: [
    IonicPageModule.forChild(MensagensPage),
  ],
})
export class MensagensPageModule {}
