import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {registerLicense} from '@syncfusion/ej2-base';
registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0xyWmFZfVpgc19FZ1ZSR2YuP1ZhSXxXdkFhXX9ZdHNUQ2BcVkA=");


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
