import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

console.log("intercepted request ... ");
let authReq;

if (localStorage.getItem('bearer') != null){
    authReq = req.clone({ headers: req.headers.set("bearer", localStorage.getItem('bearer'))});
} else{
    authReq = req;
}

console.log("Sending request with new header now ...");

return next.handle(authReq)
.catch((error, caught) => {

console.log("Error Occurred");
console.log(error);

return Observable.throw(error);
}) as any;
}
}