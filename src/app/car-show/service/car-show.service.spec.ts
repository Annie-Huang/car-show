import { CarShowService } from './car-show.service';
import {Show} from './show';
import {of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

describe('CarShowService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: CarShowService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CarShowService(<any> httpClientSpy);
  });

  it('should be created', () => {
    // const service: CarShowService = TestBed.get(CarShowService);
    expect(service).toBeTruthy();
  });

  it('#getShows should return a list of shows when successfully retrieve', () => {
    const payload: Show[] = require('../../../resources/fixtures/shows-1.json');

    httpClientSpy.get.and.returnValue(of(payload));

    service.getShows().subscribe(
      shows => expect(shows.length).toEqual(2),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('#getShows should return error when backend returned an unsuccessful response code', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Failed Downstream service',
      status: 400, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    service.getShows().subscribe(
      heroes => fail('expected an error, not shows'),
      error  => expect(error).toContain('Backend returned code 400, body was: Failed Downstream service')
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');

  });

});
