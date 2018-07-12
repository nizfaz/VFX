import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealersCommentsPage } from './dealers-comments';

@NgModule({
  declarations: [
    DealersCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(DealersCommentsPage),
  ],
})
export class DealersCommentsPageModule {}
