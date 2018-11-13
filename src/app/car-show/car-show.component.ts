import { Component, OnInit } from '@angular/core';
import {CarShowService} from './service/car-show.service';
import {CarShow} from './service/car-show';
import {CarShowFormatUtils} from './utils/car-show-format-utils';

export const EMPTY_RECORD_MSG = 'No car show records stored in the server at this stage.';

@Component({
  selector: 'app-car-show',
  templateUrl: './car-show.component.html',
  styleUrls: ['./car-show.component.scss']
})
export class CarShowComponent implements OnInit {

  carShows$: CarShow[] = [];
  noRecordMsg$: string;
  errorMsg$: string;

  constructor(private carShowService: CarShowService) { }

  ngOnInit() {
  }

  getCarShows(): void {
    this.reset();

    this.carShowService.getShows()
      .subscribe(shows => {
        shows ?
          this.carShows$ = CarShowFormatUtils.getCarShows(shows) :
          this.noRecordMsg$ = EMPTY_RECORD_MSG;
      }, error => {
        this.errorMsg$ = error;
      });
  }

  reset(): void {
    this.carShows$ = [];
    this.noRecordMsg$ = null;
    this.errorMsg$ = null;
  }
}
