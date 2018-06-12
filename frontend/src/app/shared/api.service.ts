import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private createQueryString(queryParameters: Object): string {
    let queryString = '';

    if (typeof queryParameters === 'object') {
      // tslint:disable-next-line:forin
      for (const key in queryParameters) {
        const value = queryParameters[key];
        const prefix = queryString.length === 0 ? '?' : '&';

        queryString += `${prefix}${key}=${value}`;
      }
    }
    return queryString;
  }

  private createURI(path: string, queryParameters: Object): string {
    const queryString = this.createQueryString(queryParameters);

    return `/api/${path}${queryString}`;
  }

  public get<T>(path: string, queryParameters?: Object, headers?: HttpHeaders): Observable<T> {
    const uri = this.createURI(path, queryParameters);

    return this.http.get<T>(uri, { headers: headers });
  }

  public post<T>(path: string, data: Object, queryParameters?: Object, headers?: HttpHeaders): Observable<T> {
    const uri = this.createURI(path, queryParameters);

    return this.http.post<T>(uri, data, { headers: headers });
  }

  public put<T>(path: string, data?: Object, queryParameters?: Object, headers?: HttpHeaders): Observable<T> {
    const uri = this.createURI(path, queryParameters);

    return this.http.put<T>(uri, data, { headers: headers });
  }

  public delete<T>(path: string, queryParameters?: Object, headers?: HttpHeaders): Observable<T> {
    const uri = this.createURI(path, queryParameters);

    return this.http.delete<T>(uri, { headers: headers });
  }

}
