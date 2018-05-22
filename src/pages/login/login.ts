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
          if(this.email=="" || this.email==undefined){
            alert("provide a valid email id");
            }else if(this.password=="" || this.password==undefined){
              alert("password is mandatory");
            }else if(this.password.length<6){
              alert("password should be more than 6 characters");
            }
            else{
         firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( user => {
          if(user){
            var userId=user.user.uid
            const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+userId);
            personRef.on('value', personSnapshot => {
              // console.log(personSnapshot.val());
              var myData=personSnapshot.val().username;
              console.log(myData);
              localStorage.setItem("userName",myData);
            })
            //alert("log successfull");
            this.navCtrl.setRoot(HomePage);
          }
        
        })
        .catch((_error) => {
          console.log(_error);
          alert(_error.message);
          console.log(_error.message)
        })
      }
   
  }
}
