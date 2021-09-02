import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Line } from '../_models/line';
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
  paginatedResult: PaginatedResult<Line[]> = new PaginatedResult<Line[]>();

  constructor(private http: HttpClient) { }

  getLines(page?: number, itemsPerPage?: number){
    
    let params = new HttpParams();

    if(page != null && itemsPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    //if(this.lines.length > 0) return of(this.lines);
    //return this.http.get<Line[]>(this.baseUrl + 'lines', httpOptions);
    return this.http.get<Line[]>(this.baseUrl + 'lines', {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')); //download from header and set properties of pagination interface
        }
        return this.paginatedResult;
      })
     
    )
  }

  getLine(id: number){
    return this.http.get<Line>(this.baseUrl + 'lines/' + id, httpOptions);
  }
}
