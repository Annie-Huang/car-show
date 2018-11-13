import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import sortBy from 'lodash.sortby';

import {Show} from './show';
import {CarShow} from './car-show';
import {catchError} from 'rxjs/operators';

declare var require: any;

const UNKNOWN_SHOW_NAME = 'Unknown Show Name';
const UNKNOWN_CAR_MODEL = 'Unknown Car Model';

@Injectable({
  providedIn: 'root'
})
export class CarShowService {

  constructor(private http: HttpClient) {
  }

  getShows(): Observable<Show[]> {
    // const shows: Show[] = require('../../../resources/fixtures/carShows.json');
    // return of(shows);
    return this.http.get<Show[]>('http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars')
                    .pipe(
                      catchError(this.handleError)
                    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMsg = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    // return an observable with a user-facing error message
    return throwError(errorMsg);
  }

  getCarShows(shows: Show[]): CarShow[] {
    const tempCarShowObj: Object = {};  // With intended structure of: {make+model: {make, model, shows}}

    // Create carShows with each item contains: {make+model: {make, model, shows}}.
    shows.forEach(show => {
      const showName = show.name ? show.name : UNKNOWN_SHOW_NAME;
      show.cars.forEach(car => {
        const key = car.make + car.model;

        if (tempCarShowObj[key]) {
          tempCarShowObj[key].shows.push(showName);
          // Sort shows list by alphabetically
          tempCarShowObj[key].shows = tempCarShowObj[key].shows.sort();

        } else {
          tempCarShowObj[key] = {
            ...car,
            model: car.model ? car.model : UNKNOWN_CAR_MODEL,
            shows: [showName]
          };

        }

      });
    });

    // Create CarShow[] and sorted by make and model
    let carShows: CarShow[] = Object.keys(tempCarShowObj).map(key => tempCarShowObj[key]);
    if (carShows) {
      carShows = sortBy(carShows, ['make', 'model']);
    }

    return carShows;
  }
}
