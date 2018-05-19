import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import { UserDetailsPage } from '../user-details/user-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

public myArray:any=[];
public myData:any;
public items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
   
  }

  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`);
    var currentUser = firebase.auth().currentUser;
    
  
    personRef.on('value', personSnapshot => {
      this.items = [];
      personSnapshot.forEach( itemSnap => {
        console.log(itemSnap);
        this.items.push(itemSnap.val());
        console.log(this.items);
        return false;
      })      
    });
    
    }


  itemTapped($event, item){
    console.log(item);
    this.navCtrl.push(UserDetailsPage, {userData: item});
  }
 
}
