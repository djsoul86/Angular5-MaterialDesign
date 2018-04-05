import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookMarksResponse } from '../models/bookmarks-response.model';
import { Observable } from 'rxjs/Observable';
import { BookMark } from '../models/bookmark.model';
import { AuthenticationService } from '../../../common/services/authentication.service';

@Injectable()
export class BookmarksService {
  apiURL:'http://bookmarks-api-cakephp.webtraining.zone';

  constructor(public http:HttpClient,public _authService:AuthenticationService) { 
    this.apiURL = 'http://bookmarks-api-cakephp.webtraining.zone';
  }

  getAll():Observable<BookMarksResponse>{
    const url= `${this.apiURL}/bookmarks.json`;
    return this.http.get<BookMarksResponse>(url);
  }

  update(bookmarks:BookMark):Observable<any>{
    const url = `${this.apiURL}/bookmarks/${bookmarks.id}.json`;
    return this.http.put(url,bookmarks,this._authService.user.api_token);
  }

}
