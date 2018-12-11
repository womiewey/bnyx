import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/** 
 * Generated class for the AssessmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assessment',
  templateUrl: 'assessment.html',
})
export class AssessmentPage {
  public base64Image: any;
  public byteArray: any;
  public imageBuff: any;
  public b64Data: any;
  public results: any;
  public resultArray = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public http: Http,) {
  }

  ionViewDidLoad() {

  }
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 300,
      targetWidth: 300,
    }
    
    this.camera.getPicture(options).then((imageData) => {
    this.base64Image = "data:image/jpeg;base64," + imageData;  
    this.b64Data = imageData;
    console.log("ByteArray: " + this.byteArray);
    }, (err) => {
     // Handle error
    });

  }
  b64toBlob(b64Data, contentType){
    contentType = contentType || '';
    var sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
  }
  sendImage(){
   
    this.imageBuff = this.b64toBlob(this.b64Data,'image/jpeg');
    console.log("Attempting to send image to customvision");
    let url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/d5550dc2-83f1-460c-896a-56095a101a2c/image";
    var headers = new Headers();
    //headers.append('Content-Type','application/octet-stream');
    headers.append('Content-Type','multipart/form-data');
    headers.append('Prediction-Key','9be61014be4f4555b24e5fc78fe29b4d');

    this.http.post(url, this.imageBuff,{headers: headers})
        .subscribe( (data) => {
          //try to fix the error, Object object
          console.log(data);
          this.results = JSON.stringify(data);


        }, (err) => {
          console.log(err);
          console.log("Error in this process");
        });

      }

    }
