import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  setAuthorizationHeader(): HttpHeaders{
    return  new HttpHeaders({
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
    });
  }

  /*
  insertPhoto(photo: Notification){
    const headers = this.setAuthorizationHeader();

    return this.http.post<Notification>(this.baseUrl + 'notifications/add-photo', photo, { headers });
  }
  */

}
