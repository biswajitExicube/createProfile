import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import { UserDetailsPage } from '../user-details/user-details';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

public myArray:any=[];
public myData:any;
public items:any;
constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
 
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'

  });

  loading.present();
  setTimeout(() => {
    loading.dismiss();
  },1000), 

  this.loadUser();   
}

  loadUser(){
    const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`);
    let currentUser = firebase.auth().currentUser.uid;
    console.log(currentUser);
    personRef.on('value', personSnapshot => {
      this.items = [];
      console.log(personSnapshot.val());
      let newItem=personSnapshot.val();
     for(let k in newItem){
      newItem[k].userId = k;
      if(newItem[k].userId != currentUser){
        this.items.push(newItem[k]);          
       }
        console.log(this.items);
      }     
    });
  }

  ionViewDidLoad() { 
    }
  itemTapped($event, newItem){
    console.log(newItem);
    this.navCtrl.push(UserDetailsPage, {userData: newItem});
  }

  logOut(){
    this.navCtrl.setRoot(LoginPage);
    firebase.auth().signOut
  }
 
}
