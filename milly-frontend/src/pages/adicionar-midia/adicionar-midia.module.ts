import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarMidiaPage } from './adicionar-midia';

@NgModule({
  declarations: [
    AdicionarMidiaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarMidiaPage),
  ],
})
export class AdicionarMidiaPageModule {}
