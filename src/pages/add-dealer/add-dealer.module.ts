import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDealerPage } from './add-dealer';

@NgModule({
  declarations: [
    AddDealerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDealerPage),
  ],
})
export class AddDealerPageModule {}
