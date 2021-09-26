import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Line } from '../_models/line';
import { LineParams } from '../_models/lineParams';
import { PaginatedResult } from '../_models/pagination';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class LinesService {
  baseUrl = environment.apiUrl;
  lines: Line[] = [];

  constructor(private http: HttpClient) { }

  getLines(lineParams: LineParams){

    let params = this.getPaginationHeaders(lineParams.pageNumber, lineParams.pageSize);
    
    params = params.append('lineSymbol', lineParams.lineSymbol);
    params = params.append('orderBy', lineParams.orderBy);

    return this.getPaginationResult<Line[]>(this.baseUrl + 'lines', params)
  }

  private getPaginationResult<T>(url, params) {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')); //download from header and set properties of pagination interface
        }
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
    return this.http.get<Line>(this.baseUrl + 'lines/' + id, httpOptions);
  }
}
