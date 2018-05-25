import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public items:any;
  public firstName:any;
  public lastName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    let currentUser = firebase.auth().currentUser.uid;
    console.log(currentUser);
    const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`);
    // if(currentUser){
    personRef.on('value', personSnapshot => {
      this.items = [];
      console.log(personSnapshot.val());
      let newItem=personSnapshot.val();
      // if(currentUser==newItem){
     for(let k in newItem){
      newItem[k].userId = k;
      if(newItem[k].userId==currentUser){
        this.items.push(newItem[k]);          
       }
        console.log(this.items);
      } 
      console.log(this.items[0].firstName);
       
      this.firstName=this.items[0].firstName;
      console.log(this.firstName);

      this.lastName=this.items[0].lastName;
      console.log(this.lastName);
    // }    
    })

  }
// }

profileUpdate(){

  let currentUser = firebase.auth().currentUser.uid;
    console.log(currentUser);
 firebase.database().ref(`/userProfile/`+currentUser).update({
  firstName:this.firstName,
  lastName:this.lastName

 });   
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
