import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Line } from '../_models/line';
import { LineParams } from '../_models/lineParams';
import { PaginatedResult } from '../_models/pagination';
import { Notification } from "../_models/notification";
import { Photo } from '../_models/photo';
import { LineWithPagedPhotos } from '../_models/lineWithPagedPhotos';
import { PhotoParams } from '../_models/photoParams';
import { threadId } from 'worker_threads';

/*
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}
*/
/*
const headers = new HttpHeaders({
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
});
*/

@Injectable({
  providedIn: 'root'
})
export class LinesService {
  baseUrl = environment.apiUrl;
  lines: Line[] = [];
  lineCache = new Map();
  lineParams: LineParams;
  photoParams: PhotoParams; 
  
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  });

  constructor(private http: HttpClient) { 
    this.lineParams = new LineParams();
    this.photoParams = new PhotoParams();
  }

  setAuthorizationHeader(): HttpHeaders{
    return  new HttpHeaders({
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
    });
  }

  getLines(lineParams: LineParams){

    //console.log(Object.values(lineParams).join('-'));
    var response = this.lineCache.get(Object.values(lineParams).join('-'));
    console.log(this.lineCache)
    //if(response){
    //  return of(response);
    //}

    let params = this.getPaginationHeaders(lineParams.pageNumber, lineParams.pageSize);
  
    params = params.append('searchText', lineParams.searchText);
    params = params.append('searchBy', lineParams.searchBy);
    params = params.append('orderBy', lineParams.orderBy);

    return this.getPaginationResult<Line[]>(this.baseUrl + 'lines', params)
    .pipe(map(response => {
      this.lineCache.set(Object.values(lineParams).join('-'), response);
      return response;
    }))
  }

  getLineParams(){
    return this.lineParams;
  }

  setLineParams(params: LineParams){
    this.lineParams = params;
  }

  getPhotoParams(){
    return this.photoParams;
  }

  setPhotoParams(params: PhotoParams){
    this.photoParams = params;
  }



  private getPaginationResult<T>(url, params) {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    const headers = this.setAuthorizationHeader();

    return this.http.get<T>(url,  { headers, observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        console.log(response)
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')); //download from header and set properties of pagination interface
        }
        //console.log(paginatedResult.result);
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();

      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());

      return params;
  }

  
  //getLine(id: number){
    //console.log(this.lineCache);
    //const line = [...this.lineCache.values()]
    //.reduce((arr, elem) => arr.concat(elem.result), [])
    //.find((line: Line) => line.id === id);

    //if(line){
    //  return of(line);
    //}

    //const headers = this.setAuthorizationHeader();

    //return this.http.get<Line>(this.baseUrl + 'lines/' + id, { headers } /*httpOptions*/);
  //}

  //getLine(lineParams: LineParams, id: number){
    getLine(lineParams: PhotoParams, id: number){
    
    console.log(lineParams)
    console.log(id)

    //if(line){
    //  return of(line);
    //}

    //const line = [...this.lineCache.values()]
    //.reduce((arr, elem) => arr.concat(elem.result), [])
    //.find((line: Line) => line.id === id);

    //var response = this.lineCache.get(Object.values(lineParams).join('-'));
    //console.log(this.lineCache)

    let params = this.getPaginationHeaders(lineParams.pageNumber, lineParams.pageSize);

    return this.getPaginationResult<LineWithPagedPhotos>(this.baseUrl + 'lines/' + id, params)
    .pipe(map(response => {
      console.log("**********");
      console.log(response.result);
      console.log("**********");
      this.lineCache.set(Object.values(lineParams).join('-'), response);
      return response;
    }))
  }

  updateLine(line: Line){
    const headers = this.setAuthorizationHeader();

    return this.http.put(this.baseUrl + 'lines/', line, { headers }).pipe(
      map(() => {
        const index = this.lines.indexOf(line);
        this.lines[index] = line;
      })
    )
  }


  deleteLine(id: number){

    const headers = this.setAuthorizationHeader();

    return this.http.delete<Line>(this.baseUrl + 'lines/' + id, { headers } /*httpOptions*/);
  }

  inserLine(line: Line){

    const headers = this.setAuthorizationHeader();

    localStorage.getItem('user');
    return this.http.post(this.baseUrl + 'lines/', line,  { headers });
  }

  insertNotification(notification: Notification){
    const headers = this.setAuthorizationHeader();

    const metadata:JSON = <JSON><unknown>{
      "LineId":  notification.lineId,
      "Description": notification.description
    }

    let jsonData = JSON.stringify(metadata)

    const formData = new FormData();
    
    Array.from(notification.photos).forEach(element => {
      formData.append('files', (element as unknown) as File);  
    });
    
    formData.append('jsonData', jsonData);
    

    return this.http.post(this.baseUrl + 'lines/add-notification', formData, { headers } /*httpOptions*/);
  }


}
