import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDepartamentosPage } from './admin-departamentos';

@NgModule({
  declarations: [
    AdminDepartamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDepartamentosPage),
  ],
})
export class AdminDepartamentosPageModule {}
