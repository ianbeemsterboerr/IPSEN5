import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq;

        if (localStorage.getItem('bearer') != null) {
            authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('bearer'))});
        } else {
            authReq = req;
        }

        return next.handle(authReq)
            .catch((error, caught) => {
                return Observable.throw(error);
            }) as any;
    }
}
