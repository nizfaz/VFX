import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomersCommentsPage } from './customers-comments';

@NgModule({
  declarations: [
    CustomersCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomersCommentsPage),
  ],
})
export class CustomersCommentsPageModule {}
