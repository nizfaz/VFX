import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealerUsersPage } from './dealer-users';

@NgModule({
  declarations: [
    DealerUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(DealerUsersPage),
  ],
})
export class DealerUsersPageModule {}
