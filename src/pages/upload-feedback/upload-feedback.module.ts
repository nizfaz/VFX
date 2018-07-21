import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadFeedbackPage } from './upload-feedback';

@NgModule({
  declarations: [
    UploadFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadFeedbackPage),
  ],
})
export class UploadFeedbackPageModule {}
