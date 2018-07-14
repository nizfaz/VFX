import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerCommentsPage } from './customer-comments';

@NgModule({
  declarations: [
    CustomerCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerCommentsPage),
  ],
})
export class CustomerCommentsPageModule {}
