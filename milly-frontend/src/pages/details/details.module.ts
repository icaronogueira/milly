import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Details } from './details';
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    Details,
  ],
  imports: [
    IonicPageModule.forChild(Details),
    IonicImageViewerModule
  ],
  exports: [
    Details
  ]
})
export class DetailsModule {}
