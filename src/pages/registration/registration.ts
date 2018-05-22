import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  public firstName:any;
  public lastName:any;
  public userName:any;
  public password:any;
  public email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }
  registration(){
   
    if(this.firstName=="" || this.firstName==undefined){
      alert("enter your first name");
    }else if(this.lastName=="" || this.lastName==undefined){
      alert("enter your Last  name");
    }
    else if(this.userName=="" || this.userName==undefined){
      alert("enter your userName");
    }
    else if(this.email=="" || this.email==undefined){
      alert("enter your email");
    }
    else if(this.password=="" || this.password==undefined){
      alert("enter your password");
    }
    else if(this.password.length<6){
      alert("password should be more than 6 characters");
    }
  
    else{
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then( newUser => {
      console.log(newUser);
      console.log(newUser.user.uid);
      firebase.database().ref('/userProfile/').child(newUser.user.uid).set({ 
        email: this.email,
        username:this.userName,
        firstName:this.firstName,
        lastName:this.lastName,
        login:true,
      });
      console.log(newUser.user.uid);
      this.navCtrl.setRoot(LoginPage);
    });
  }
    
}   
  }


