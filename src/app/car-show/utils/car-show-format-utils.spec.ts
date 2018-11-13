import {Show} from '../service/show';
import {CarShow} from '../service/car-show';
import {CarShowFormatUtils} from './car-show-format-utils';

declare var require: any;
describe('CarShowFormatUtils', () => {
  it('#getCarShows should convert shows-1.json to carShows-1.json', () => {
    const shows: Show[] = require('../../../resources/fixtures/shows-1.json');
    const expectCarShows: CarShow[] = require('../../../resources/fixtures/carShows-1.json');
    const carShows: CarShow[] = CarShowFormatUtils.getCarShows(shows);
    expect(JSON.stringify(carShows)).toEqual(JSON.stringify(expectCarShows));
  });

  it('#getCarShows should convert shows-2.json to carShows-2.json', () => {
    const shows: Show[] = require('../../../resources/fixtures/shows-2.json');
    const expectCarShows: CarShow[] = require('../../../resources/fixtures/carShows-2.json');
    const carShows: CarShow[] = CarShowFormatUtils.getCarShows(shows);
    expect(JSON.stringify(carShows)).toEqual(JSON.stringify(expectCarShows));
  });
});
