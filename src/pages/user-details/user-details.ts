import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  public userMsg: string;
  public userDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.userDetails = this.navParams.get('userData');
    console.log(this.userDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

  sendMsg(){
    var currentUser = firebase.auth().currentUser;
    console.log(currentUser);
   
    firebase.database().ref('/userProfile/' +currentUser.uid + "/messege/").push({
      userMessege:this.userMsg
    
    })
    console.log(this.userMsg);
    this.userMsg='';
    

    
  }

}
