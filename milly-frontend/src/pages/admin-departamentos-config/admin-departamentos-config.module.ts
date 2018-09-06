import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDepartamentosConfigPage } from './admin-departamentos-config';

@NgModule({
  declarations: [
    AdminDepartamentosConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDepartamentosConfigPage),
  ],
})
export class AdminDepartamentosConfigPageModule {}
