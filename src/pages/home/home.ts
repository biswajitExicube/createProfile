import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import * as firebase from 'firebase'
import { UserDetailsPage } from '../user-details/user-details';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public messegeUserName:any;
  public messegeArray:any;
  public currentUser:any;
  public items:any;
  public loading:any;
   item:Object;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController) {
        this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
        this.loading.present();
        this.currentUser = firebase.auth().currentUser.uid;
        console.log(this.currentUser);
        const personRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+this.currentUser);
        personRef.on('value', personSnapshot => {
    if(personSnapshot.val()){
      // console.log(personSnapshot.val().messege);
        let messeges=personSnapshot.val().messege;
        // console.log(messeges);
        this.messegeArray=[];
        for(let data in messeges){
        messeges[data].msgId=data;
        if(this.currentUser!=messeges[data].msguserId){  
        this.messegeArray.push(messeges[data]);   
        } 
      }
      this.loading.dismiss();
      console.log(this.messegeArray);
  }
  else{
    this.loading.dismiss();
  }
    })  
  }
  logOut(){
    
    firebase.auth().signOut();
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
  }
  deleteMsg(i){
    // console.log(i);
    // console.log(this.messegeArray[i].msgId);
     firebase.database().ref(`userProfile/`+this.currentUser+'/messege/' +this.messegeArray[i].msgId).remove();
  }

  userInfo(messeges){
 
//  console.log(messeges);

 let data = {
   username:messeges.messegeUser,
   userId:messeges.msguserId
 }
  //  console.log(messeges.msguserId);
  this.navCtrl.push(UserDetailsPage, {huserData: data});
  // console.log(messeges.msguserId);
  }

}


  
    
     
    


   
 


