import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  public userMsg: string;
  public userDetails: any;
  public messegeArray:any
  public userNm:any;
  public userMessegeId:any;
  public messegeUserName:any;
  public currentUser:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    },700), 
  
    this.currentUser = firebase.auth().currentUser.uid;
    console.log(this.currentUser)
    this.userDetails = this.navParams.get('userData');
    console.log(this.userDetails);
    const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.userDetails.userId);
    personRef.on('value', personSnapshot => {
    console.log(personSnapshot.val());
    
    let messeges=personSnapshot.val().messege
    
    this.messegeArray=[];
    for(let data in messeges){
      if(this.currentUser==messeges[data].msguserId){
      this.messegeArray.push(messeges[data]);
    }
    console.log(this.messegeArray);

  }
    });

    
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');

  }
  sendMsg(){
    
    const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.currentUser);
   
    personRef.on('value', personSnapshot => {
    console.log(personSnapshot.val()); 
    this.messegeUserName=personSnapshot.val().username;
    console.log(this.messegeUserName)
    });
    
  
    firebase.database().ref('/userProfile/' + this.userDetails.userId+ "/messege/").push({
      userMessege:this.userMsg,
      msguserId:this.currentUser,
      messegeUser:this.messegeUserName
      
    })
    console.log(this.userMsg);
    this.userMsg='';
    
    
  }
  logOut(){
    this.navCtrl.setRoot(LoginPage);
    firebase.auth().signOut
  }

}
