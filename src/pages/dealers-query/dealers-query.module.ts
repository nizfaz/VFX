import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealersQueryPage } from './dealers-query';

@NgModule({
  declarations: [
    DealersQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(DealersQueryPage),
  ],
})
export class DealersQueryPageModule {}
