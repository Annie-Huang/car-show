import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CarShowComponent, EMPTY_RECORD_MSG} from './car-show.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CarShow} from './service/car-show';
import {CarShowService} from './service/car-show.service';
import {of, throwError} from 'rxjs';

declare var require: any;

describe('CarShowComponent', () => {
  let component: CarShowComponent;
  let fixture: ComponentFixture<CarShowComponent>;

  let shows = '';
  const carShowService = jasmine.createSpyObj('CarShowService', ['getShows']);
  let getShowsSpy = carShowService.getShows.and.returnValue( of(shows) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarShowComponent ],
      imports: [ HttpClientTestingModule ],
      providers:    [
        { provide: CarShowService, useValue: carShowService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#reset shall reset all local values', () => {
    const carShow: CarShow  = {make: '', model: '', shows: []};
    component.carShows$ = [carShow];
    component.noRecordMsg$ = 'abc';
    component.errorMsg$ = 'abc';
    component.reset();
    expect(component.carShows$.length).toBe(0);
    expect(component.noRecordMsg$).toBeNull();
    expect(component.noRecordMsg$).toBeNull();
  });

  it('#getShows shall set noRecordMsg$ if carShowService.getShows() returns emtpy string.', () => {
    component.getCarShows();
    expect(component.noRecordMsg$).toBe(EMPTY_RECORD_MSG);

    expect(component.carShows$.length).toBe(0);
    expect(component.errorMsg$).toBeNull();

  });

  it('#getShows shall set carShows$ if carShowService.getShows() returns a list.', () => {
    shows = require('../../resources/fixtures/shows-1.json');
    getShowsSpy = carShowService.getShows.and.returnValue( of(shows) );
    component.getCarShows();
    expect(component.carShows$.length).toBe(8);

    expect(component.noRecordMsg$).toBeNull();
    expect(component.errorMsg$).toBeNull();
  });

  it('#getShows shall set errorMsg$ if carShowService.getShows() throws an error.', () => {
    shows = require('../../resources/fixtures/shows-1.json');
    getShowsSpy = carShowService.getShows.and.returnValue(throwError('abc'));
    component.getCarShows();
    expect(component.errorMsg$).toBe('abc');
    expect(component.carShows$.length).toBe(0);
    expect(component.noRecordMsg$).toBeNull();

  });

});
