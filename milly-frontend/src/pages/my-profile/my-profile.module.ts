import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProfile } from './my-profile';

@NgModule({
  declarations: [
    MyProfile,
  ],
  imports: [
    IonicPageModule.forChild(MyProfile),
  ],
  exports: [
    MyProfile
  ]
})
export class MyProfileModule {}
