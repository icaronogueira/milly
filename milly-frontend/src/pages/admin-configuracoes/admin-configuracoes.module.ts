import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminConfiguracoesPage } from './admin-configuracoes';

@NgModule({
  declarations: [
    AdminConfiguracoesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminConfiguracoesPage),
  ],
})
export class AdminConfiguracoesPageModule {}
