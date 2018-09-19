import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarcarDepartamentosPage } from './marcar-departamentos';

@NgModule({
  declarations: [
    MarcarDepartamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(MarcarDepartamentosPage),
  ],
})
export class MarcarDepartamentosPageModule {}
