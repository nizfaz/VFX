import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProdUserPage } from './add-prod-user';

@NgModule({
  declarations: [
    AddProdUserPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProdUserPage),
  ],
})
export class AddProdUserPageModule {}
