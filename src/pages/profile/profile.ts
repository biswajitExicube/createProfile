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

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
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
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation:true
  }
  this.camera.getPicture(options).then((imageData) => {
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    console.log(this.base64Image);
  }, (err) => {
   alert('Handle error')
  });
}



cameraClick(){                   
    console.log('clicked....')
    const options: CameraOptions = {
    quality: 10,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options).then((imageData) => {
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    console.log(this.base64Image);
  }, (err) => {
   alert('Handle error')
  });
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
// public presentActionSheet() {
//   let actionSheet = this.actionSheetCtrl.create({
//     title: 'Select Image Source',
//     buttons: [
//       {
//         text: 'Load from Library',
//         handler: () => {
//           this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
//         }
//       },
//       {
//         text: 'Use Camera',
//         handler: () => {
//           this.takePicture(this.camera.PictureSourceType.CAMERA);
//         }
//       },
//       {
//         text: 'Cancel',
//         role: 'cancel'
//       }
//     ]
//   });
//   actionSheet.present();
// }
// public takePicture(sourceType) {
//   const cameraoptions: CameraOptions = {
//     quality: 10,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE
//   }
//   var options = {
//     quality: 100,
//     sourceType: sourceType,
//     saveToPhotoAlbum: false,
//     correctOrientation: true
//   };
 
//   // Get the data of an image
//   this.camera.getPicture(cameraoptions).then((imagePath) => {
//     // Special handling for Android library
//     if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
//       this.filePath.resolveNativePath(imagePath)
//         .then(filePath => {
//           let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
//           let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
//           this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//         });
//     } else {
//       var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
//       var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
//       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
//     }
//   }, (err) => {
//     this.presentToast('Error while selecting image.');
//   });
// }
// // Create a new name for the image
// private createFileName() {
//   var d = new Date(),
//   n = d.getTime(),
//   newFileName =  n + ".jpg";
//   return newFileName;
// }
 
// // Copy the image to a local folder
// private copyFileToLocalDir(namePath, currentName, newFileName) {
//   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
//     this.lastImage = newFileName;
//   }, error => {
//     this.presentToast('Error while storing file.');
//   });
// }
 
// private presentToast(text) {
//   let toast = this.toastCtrl.create({
//     message: text,
//     duration: 3000,
//     position: 'top'
//   });
//   toast.present();
// }
 
// // Always get the accurate path to your apps folder
// public pathForImage(img) {
//   if (img === null) {
//     return '';
//   } else {
//     return cordova.file.dataDirectory + img;
//   }
// }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
