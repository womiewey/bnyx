import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//added native
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Base64 } from '@ionic-native/base64';
//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AssessmentPage } from '../pages/assessment/assessment';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AssessmentPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AssessmentPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    Base64ToGallery,
    Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
