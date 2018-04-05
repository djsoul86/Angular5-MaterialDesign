import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule,MatTableModule,MatMenuModule,MatPaginatorModule,MatSortModule,MatIconModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {routes} from './routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './public/login/login.component';
import { HomeComponent } from './auth/home/home.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { PublicGuard } from './common/guards/public.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthenticationService } from './common/services/authentication.service';
import { Ng2Webstorage } from 'ngx-webstorage';
import { BookmarksService} from './auth/bookmarks/services/bookmarks.service';
// import { BookMark } from './auth/bookmarks/models/bookmark.model';

import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { BookmarksComponent } from './auth/bookmarks/bookmarks.component';
import { BookMarksResponse } from './auth/bookmarks/models/bookmarks-response.model';
import { WindowReferenceService } from './common/services/window-reference.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    BookmarksComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    Ng2Webstorage,
    MatInputModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [PublicGuard,AuthGuard,AuthenticationService,
    BookmarksService,
    WindowReferenceService,
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
