import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase'

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    // console.log(this.password)

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
      //alert("registration successfull");
      this.navCtrl.setRoot(LoginPage);
    });
    
}

   
  }


