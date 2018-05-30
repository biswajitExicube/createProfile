import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import firebase from 'firebase/app';
import 'firebase/auth';  
import 'firebase/database';
import { ListPage } from '../list/list';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email:any;
  public username:any;
  public password:any;
  public item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  registration(){
    this.navCtrl.push(RegistrationPage);
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
            console.log(user);
              var userId=user.uid
              const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+userId);
              personRef.on('value', personSnapshot => {
              console.log(personSnapshot.val());
              var myData=personSnapshot.val().firstName;
              console.log(myData);
              localStorage.setItem("userName",myData);
              var myNewData=personSnapshot.val().lastName;
              console.log(myNewData[0]);
             
              localStorage.setItem("userLastName",myNewData[0]); 
            })
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
  forgotPass(){
    // alert("how can u forget ur password?");

    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'email',
          placeholder: 'enter your email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log(data);                                                       
            console.log(data.email);
           return firebase.auth().sendPasswordResetEmail(data.email)
            .then(() => alert("email sent"))
            .catch((error) => alert(error))
          }
        }
      ]
    });
    prompt.present();

  }

  // initializeApp() {
  //   firebase.initializeApp(FirebaseConfig);

  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (!user) {
  //       this.nav.setRoot(Home);
  //     } else {
  //       this.nav.setRoot(Menu);
  //     }
  //   });

  //   this.platform.ready().then(() => {
  //     StatusBar.styleDefault();
  //   });
  // }
}
