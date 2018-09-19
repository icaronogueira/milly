import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaBancariaPage } from './lista-bancaria';

@NgModule({
  declarations: [
    ListaBancariaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaBancariaPage),
  ],
})
export class ListaBancariaPageModule {}
