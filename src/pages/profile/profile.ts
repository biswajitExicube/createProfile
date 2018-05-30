import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading,ActionSheetController, ToastController,Platform } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';  
import 'firebase/database';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Crop } from '@ionic-native/crop';
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  lastImage: string = null;
  loading: Loading;
  public items:any;
  public firstName:any;
  public lastName:any;
  public storageRef:any;
  public base64Image:any;
  public username:any;
  public currentUser:any;
  public item:any;
  public imageData:any;
  allowEdit:true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,private crop: Crop) {
    this.currentUser = firebase.auth().currentUser.uid;
    console.log(this.currentUser);
    const personRef: firebase.database.Reference = firebase.database().ref('/userProfile/' +this.currentUser);
    // if(currentUser){
     
    personRef.on('value', personSnapshot => {
   console.log(personSnapshot.val());
   this.firstName=personSnapshot.val().firstName;
   this.lastName=personSnapshot.val().lastName;
   this.imageData=personSnapshot.val().image;
    // }    
    })
  }
profileUpdate(){
  let currentUser = firebase.auth().currentUser.uid;
  console.log(currentUser);
  firebase.database().ref(`/userProfile/`+currentUser).update({
  firstName:this.firstName,
  lastName:this.lastName
 });   
}
galleryClick(){
  console.log('clicked....')
    const options: CameraOptions = {
      quality: 20,
      targetWidth: 1920,
      targetHeight: 1920,
      allowEdit : true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // allowEdit:true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true,
  }
  this.camera.getPicture(options).then((imageData) => {


    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    if(this.base64Image){
      this.uploadPic();
    }
    console.log(this.base64Image);
  }, (err) => {
   alert('Handle error')
  });
  // this.uploadPic();
}
cameraClick(){                   
    console.log('clicked....')
    const options: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit:true
  }
  this.camera.getPicture(options).then((imageData) => {
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    if(this.base64Image){
      this.uploadPic();
      
    }
    console.log(this.base64Image);
  }, (err) => {
   alert('Handle error')
  }
);
}
  presentActionSheet(){
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Modify your album',
    buttons: [
      {
        text: 'Camera',
        role: 'Pic click',
        handler: () => {
          this.cameraClick();
        }
      },
      {
        text: 'Gallery',
        handler: () => {
         this.galleryClick();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }      
    ]
  });
  actionSheet.present();
}
uploadPic(){
  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
  console.log(this.base64Image);
  this.storageRef = firebase.storage().ref();
  const filename = Math.floor(Date.now() / 1000);
  const imageRef = this.storageRef.child(`images/${filename}.jpg`);
  console.log(imageRef);
  imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
    console.log(snapshot);
    firebase.database().ref('/userProfile/' +this.currentUser).update({
      image:snapshot.downloadURL,
    })
    loader.dismiss();
    console.log(this.currentUser.image);
  });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  logOut(){
    firebase.auth().signOut();
  }
  delete(){
    firebase.database().ref('/userProfile/' +this.currentUser).remove();
      
    
  }
}
