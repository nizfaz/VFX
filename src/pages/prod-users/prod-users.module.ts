import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdUsersPage } from './prod-users';

@NgModule({
  declarations: [
    ProdUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdUsersPage),
  ],
})
export class ProdUsersPageModule {}
