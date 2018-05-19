import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import * as firebase from 'firebase'



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email:any;
  public username:any;
  public password:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  registration(){
    this.navCtrl.push(RegistrationPage)
  }
  goLogin(){

    console.log(this.email);
    console.log(this.password);
    
         firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( user => {
          if(user){
            console.log(user);

            //alert("log successfull");
            this.navCtrl.setRoot(HomePage);
          }
        })
        .catch((_error) => {
          console.log(_error);
          console.log(_error.message)
        })
   
  }
}
