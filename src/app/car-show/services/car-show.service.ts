import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import sortBy from 'lodash.sortby';

import {Show} from './show';
import {CarWithShowInfo} from './car-with-show-info';

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
    // return this.http.get('http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars');
  }

  generateCarWithShowInfoListFromShows(shows: Show[]): CarWithShowInfo[] {
    let carWithShowInfoList = [];

    // Create carWithShowInfoList with each item contains: make, model, shows.
    shows.map(show => {
      show.cars.map(car => {
        const matchCarList = carWithShowInfoList.filter(cWSI => cWSI.make === car.make && cWSI.model === car.model);

        if (matchCarList.length === 0) {
          carWithShowInfoList.push({
            ...car,
            shows: [show.name]
          });

        } else {
          matchCarList[0].shows.push(show.name);
          // Sort shows list by alphabetically
          matchCarList[0].shows = matchCarList[0].shows.sort();
        }

      });
    });

    // Sort carWithShowInfoList by make and model
    carWithShowInfoList = sortBy(carWithShowInfoList, ['make', 'model']);

    return carWithShowInfoList;
  }
}
