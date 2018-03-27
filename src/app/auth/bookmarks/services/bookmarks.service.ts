import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookMarksResponse } from '../models/bookmarks-response.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookmarksService {
  apiURL:'http://bookmarks-api-cakephp.webtraining.zone';

  constructor(public http:HttpClient) { 
    this.apiURL = 'http://bookmarks-api-cakephp.webtraining.zone';
  }

  getAll():Observable<BookMarksResponse>{
    const url= `${this.apiURL}/bookmarks.json`;
    return this.http.get<BookMarksResponse>(url);
  }

}
