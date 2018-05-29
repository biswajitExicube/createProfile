import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { ProfilePageModule } from '../pages/profile/profile.module'
import { RegistrationPageModule } from '../pages/registration/registration.module';
import { UserDetailsPageModule } from '../pages/user-details/user-details.module';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase/app';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

// import 'firebase/auth';  
// import 'firebase/database';

var config = {
  apiKey: "AIzaSyD1w95jYQESCSs1HNW5dQFNCJ1dkO8c2Mw",
  authDomain: "createprofile-57893.firebaseapp.com",
  databaseURL: "https://createprofile-57893.firebaseio.com",
  projectId: "createprofile-57893",
  storageBucket: "createprofile-57893.appspot.com",
  messagingSenderId: "886845942496"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    RegistrationPageModule,
    ProfilePageModule,
    UserDetailsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    Transfer,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
