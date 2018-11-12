import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import sortBy from 'lodash.sortby';

import {Show} from './show';
import {CarShow} from './car-show';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class CarShowService {

  constructor(private http: HttpClient) {
  }

  getShows(): Observable<Show[]> {
    const shows: Show[] = require('../../../resources/fixtures/carShows.json');
    return of(shows);
    // return this.http.get<Show[]>('http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars');
  }

  getCarShows(shows: Show[]): CarShow[] {
    const tempCarShowObj: Object = {};  // With intended structure of: {make+model: {make, model, shows}}

    // Create carShows with each item contains: {make+model: {make, model, shows}}.
    shows.forEach(show => {
      show.cars.forEach(car => {
        const key = car.make + car.model;

        if (tempCarShowObj[key]) {
          tempCarShowObj[key].shows.push(show.name);
          // Sort shows list by alphabetically
          tempCarShowObj[key].shows = tempCarShowObj[key].shows.sort();

        } else {
          tempCarShowObj[key] = {
            ...car,
            shows: [show.name]
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
