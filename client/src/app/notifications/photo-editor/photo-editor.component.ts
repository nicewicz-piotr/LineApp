import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Notification } from 'src/app/_models/notification';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  //@Input() notification: Notification;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;


  constructor(bsModalRef: BsModalRef) { 
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(event: any){
    this.hasBaseDropzoneOver = event;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      //url: this.baseUrl + 'notifications/add-photo' + this.notification.id,
      url: this.baseUrl + 'lines/add-notification',
      authToken: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response)
      {
        const photo: Photo = JSON.parse(response); //parse response out of JSON 
        //this.notification.photos.push(photo);
        }
      }
    }

}
