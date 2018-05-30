import { Component, ViewChild,NgZone } from '@angular/core';
import {Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import firebase from 'firebase/app';
import 'firebase/auth';  
import 'firebase/database';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') navCtrl: NavController;
  public userName:any;
  public email:any;
  public password:any;
  public currentUser:any;
  public userLastName:any;
  rootPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private  zone:NgZone) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage } ,
      { title: 'Profile', component: ProfilePage}
    ];

  
  
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        console.log(user);
        console.log("user find");
        this.zone.run(()=>{
        this.rootPage = HomePage;
         });
         
      }
      else{  
        console.log("user not find");
        this.zone.run(()=>{
        this.rootPage = LoginPage;
        })
      }
    });
  }
  ngDoCheck(){ 
    if(localStorage.getItem("userName")){
    this.userName=localStorage.getItem("userName");
  }
    if(localStorage.getItem("userLastName")){
    this.userLastName=localStorage.getItem("userLastName");
  }
  }
  initializeApp() { 
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }
  ionViewDidLoad() { 
    
  } 
  ngAfterViewInit() {
  }

}
