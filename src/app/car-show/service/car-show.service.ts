import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {Show} from './show';
import {catchError} from 'rxjs/operators';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class CarShowService {

  constructor(private http: HttpClient) {
  }

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>('/api/v1/cars')
                    .pipe(
                      catchError(this.handleError)
                    );
    // const shows: Show[] = require('../../../resources/fixtures/shows-1.json');
    // return of(shows);
  }

  private handleError(error: HttpErrorResponse) {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    const errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`;

    // return an observable with a user-facing error message
    return throwError(errorMsg);
  }
}
