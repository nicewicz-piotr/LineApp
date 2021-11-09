import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Line } from '../_models/line';
import { LineParams } from '../_models/lineParams';
import { PaginatedResult } from '../_models/pagination';

/*
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}
*/

const headers = new HttpHeaders({
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
});

@Injectable({
  providedIn: 'root'
})
export class LinesService {
  baseUrl = environment.apiUrl;
  lines: Line[] = [];
  lineCache = new Map();
  lineParams: LineParams;

  constructor(private http: HttpClient) { 
    this.lineParams = new LineParams();
  }

  getLines(lineParams: LineParams){

    console.log(Object.values(lineParams).join('-'));
    var response = this.lineCache.get(Object.values(lineParams).join('-'));

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


  private getPaginationResult<T>(url, params) {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url,  { headers, observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
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

  getLine(id: number){
    console.log(this.lineCache);
    const line = [...this.lineCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result), [])
    .find((line: Line) => line.id === id);

    if(line){
      return of(line);
    }

    return this.http.get<Line>(this.baseUrl + 'lines/' + id, { headers } /*httpOptions*/);
  }

  deleteLine(id: number){
    return this.http.delete<Line>(this.baseUrl + 'lines/' + id, { headers } /*httpOptions*/);
  }

  inserLine(line: any){
    return this.http.post(this.baseUrl + 'lines/', line,  { headers });
  }
}
