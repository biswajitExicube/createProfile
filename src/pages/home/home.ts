import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import * as firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public messegeArray:any;
  constructor(public navCtrl: NavController) {
    let currentUser = firebase.auth().currentUser.uid;
    console.log(currentUser);
    const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+currentUser);
    personRef.on('value', personSnapshot => {
    console.log(personSnapshot.val());
    let messeges=personSnapshot.val().messege;
    console.log(messeges);
    this.messegeArray=[];
    for(let data in messeges){
      if(currentUser!=messeges[data].msguserId){
      this.messegeArray.push(messeges[data]);
    }
    console.log(this.messegeArray);
  }

    })
  }
  logOut(){
    this.navCtrl.setRoot(LoginPage);
    firebase.auth().signOut;
  }
}
