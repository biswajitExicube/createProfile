import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import * as firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public messegeUserName:any;
  public messegeArray:any;
  public currentUser:any;
  public items:any;
  constructor(public navCtrl: NavController) {

    this.currentUser = firebase.auth().currentUser.uid;
    console.log(this.currentUser);
    const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.currentUser);
    personRef.on('value', personSnapshot => {
    let messeges=personSnapshot.val().messege;
    this.messegeArray=[];
    for(let data in messeges){
      messeges[data].msgId=data;
      // console.log(messeges[data]);
      if(this.currentUser!=messeges[data].msguserId){
      this.messegeArray.push(messeges[data]);
    }
    console.log(this.messegeArray);
  }
    })
  }
  logOut(){
    this.navCtrl.setRoot(LoginPage);
    firebase.auth().signOut;
    localStorage.removeItem("userName");
  }
  deleteMsg(i){
    console.log(i);
    console.log(this.messegeArray[i].msgId);
     firebase.database().ref(`userProfile/`+this.currentUser+'/messege/' +this.messegeArray[i].msgId).remove();
  }
}


  
    
     
    


   
 


