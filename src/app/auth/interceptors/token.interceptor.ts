import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../common/services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public injector:Injector){

  }

intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
  const authService = this.injector.get(AuthenticationService);
  const token = authService.user ? 
                authService.user.api_token : '';
  request.clone({
    setHeaders:{
      'Api-Token':token,
      'Authorization': `User ${token}`, //TODO: JWT-based token
      'X-Request-With': 'XMLHttpRequest'

    }
  });
  return next.handle(request);
}

}
