import { Component, OnInit } from '@angular/core';
import { BookmarksService } from './services/bookmarks.service';
import { BookMark } from './models/bookmark.model';
import { BookMarksResponse } from './models/bookmarks-response.model';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks:Array<BookMark>;
  displayedColumns = ['id','title','description','created'];
  dataSource;

  applyFilter(filterValue:string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }


  constructor(public bookmarksService:BookmarksService) { }

  ngOnInit() {
    this.bookmarksService.getAll().subscribe(
      (data:BookMarksResponse) => {
        this.bookmarks = data.bookmarks;
        this.dataSource = new MatTableDataSource<BookMark>(this.bookmarks);
      },
      error=>{
        console.error(error);
      }
    );
  }

}
