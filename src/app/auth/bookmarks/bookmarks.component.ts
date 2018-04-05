import { Component, OnInit,ViewChild } from '@angular/core';
import { BookmarksService } from './services/bookmarks.service';
import { BookMark } from './models/bookmark.model';
import { BookMarksResponse } from './models/bookmarks-response.model';
import { MatTableDataSource,MatPaginator,MatSort, MatDialog } from '@angular/material';
import { WindowReferenceService } from '../../common/services/window-reference.service';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks:Array<BookMark>;
  displayedColumns = ['id','title','description','created','actions'];
  dataSource;
  length = 100;
  pageSize = 3;
  pageSizeOptions = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  nativeWindow: any;


  applyFilter(filterValue:string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }


  constructor(public bookmarksService:BookmarksService
    ,public windowReference:WindowReferenceService
    ,public dialog:MatDialog) { 
    this.nativeWindow = this.windowReference.getNativeWindow();
  }


  openBookmarkURL(bookmark:BookMark,event:Event){
    event.preventDefault();
    this.nativeWindow.open(bookmark.url);
    //window.location.href = bookmark.url;
  }

  editBookmark(bookmark:BookMark,event:Event){
    this.openDialogToEditBookmark(bookmark);
  }

  openDialogToEditBookmark(bookmark:BookMark){
    const dialogRef = this.dialog.open(EditBookmarkComponent,
      {
        data:bookmark,
        height:'400px',
        width:'600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });

  }


  ngOnInit() {
    this.bookmarksService.getAll().subscribe(
      (data:BookMarksResponse) => {
        this.bookmarks = data.bookmarks;
        this.dataSource = new MatTableDataSource<BookMark>(this.bookmarks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error=>{
        console.error(error);
      }
    );
  }

}
