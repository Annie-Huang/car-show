import {Show} from '../service/show';
import {CarShow} from '../service/car-show';
import sortBy from 'lodash.sortby';

const UNKNOWN_SHOW_NAME = 'Unknown Show Name';
const UNKNOWN_CAR_MODEL = 'Unknown Car Model';

export class CarShowFormatUtils {
  public static getCarShows(shows: Show[]): CarShow[] {
    const tempCarShowObj: Object = {};  // With intended structure of: {make+model: {make, model, shows}}

    // Create carShows with each item contains: {make+model: {make, model, shows}}.
    shows.forEach(show => {
      const showName = show.name ? show.name : UNKNOWN_SHOW_NAME;
      show.cars.forEach(car => {
        const key = car.make + car.model;

        if (tempCarShowObj[key]) {
          // Only add showName if it doesn't exist.
          if (!tempCarShowObj[key].shows.includes(showName)) {
            tempCarShowObj[key].shows.push(showName);
          }

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
    const carShows: CarShow[] = Object.keys(tempCarShowObj).map(key => tempCarShowObj[key]);
    // Sort shows list by alphabetically
    carShows.forEach(carShow => carShow.shows.sort());
    return sortBy(carShows, ['make', 'model']);
  }
}
