import { Component, OnInit } from '@angular/core';
import {CarShowService} from './services/car-show.service';
import {CarShow} from './services/car-show';

const EMPTY_RECORDS = 'No car show records stored in the server at this stage.';

@Component({
  selector: 'app-car-show',
  templateUrl: './car-show.component.html',
  styleUrls: ['./car-show.component.scss']
})
export class CarShowComponent implements OnInit {

  carShows$: CarShow[] = [];
  emptyRecords$: string;
  errorMsg$: string;

  constructor(private carShowService: CarShowService) { }

  ngOnInit() {
  }

  getCarShows(): void {
    this.reset();

    this.carShowService.getShows()
      .subscribe(shows => {
        console.log('shows=', shows);
        shows ?
          this.carShows$ = this.carShowService.getCarShows(shows) :
          this.emptyRecords$ = EMPTY_RECORDS;
        console.log('this.carShows$', this.carShows$);
      }, error => {
        this.errorMsg$ = error;
      });
  }

  reset(): void {
    this.carShows$ = [];
    this.emptyRecords$ = null;
    this.errorMsg$ = null;
  }
}
