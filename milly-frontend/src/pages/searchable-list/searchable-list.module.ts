import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchableListPage } from './searchable-list';

@NgModule({
  declarations: [
    SearchableListPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchableListPage),
  ],
})
export class SearchableListPageModule {}
