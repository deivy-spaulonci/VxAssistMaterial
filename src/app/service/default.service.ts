import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  private url = 'http://localhost:8081/';  // URL to web api

  constructor(private http: HttpClient) {}

  authenticate() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization : 'Basic ' + btoa('admin' + ':' + 'admin')
    });
    return headers;
  }

  get(api: string): Observable<any> {
    console.log(this.url+api);
    return this.http.get<any>(this.url + api, {headers: this.authenticate()})
      .pipe(
        tap(_ => console.log('fetched any ss')),
        catchError(this.handleError<any[]>('get', []))
      );
  }

  /*
  getById(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched id=${id}`)),
      catchError(this.handleError<any>(`get by id=${id}`))
    );
  }
/*
  getNo404<Data>(id: number): Observable<any> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(objs => objs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} obj id=${id}`);
        }),
        catchError(this.handleError<any>(`getHero id=${id}`))
      );
  }

  search(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => console.log(`found matching "${term}"`)),
      catchError(this.handleError<any[]>('search', []))
    );
  }
  */

  save(obj: any, api: string): Observable<any> {
    console.log(JSON.stringify(obj));
    return this.http.post<any>(this.url + api, obj, {headers: this.authenticate()}).pipe(
      tap((newObjeto: any) => console.log(`added w/ id=${newObjeto.id}`)),
      catchError(this.handleError<any>('save'))
    );
  }
  //
  // update(obj: any, api: string): Observable<any> {
  //   return this.http.put(this.url + api, obj, {headers: this.authenticate()}).pipe(
  //     tap(_ => console.log(`updated id=${obj.id}`)),
  //     catchError(this.handleError<any>('update'))
  //   );
  // }
  //
  delete(obj: any | number, api: string): Observable<any> {
    const id = typeof obj === 'number' ? obj : obj.id;
    const url = `${this.url + api}/${id}`;
  
    return this.http.delete<any>(url, {headers: this.authenticate()}).pipe(
      tap(_ => console.log(`deleted id=${id}`)),
      catchError(this.handleError<any>('delete'))
    );
  }
  //
  //
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
