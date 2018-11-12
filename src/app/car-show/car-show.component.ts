import { Component, OnInit } from '@angular/core';
import {CarShowService} from './services/car-show.service';
import {CarShow} from './services/car-show';

@Component({
  selector: 'app-car-show',
  templateUrl: './car-show.component.html',
  styleUrls: ['./car-show.component.scss']
})
export class CarShowComponent implements OnInit {

  carShows$: CarShow[] = [];

  constructor(private carShowService: CarShowService) { }

  ngOnInit() {
  }

  getCarShows(): void {
    this.carShowService.getShows()
      .subscribe(shows => {
      this.carShows$ = this.carShowService.getCarShows(shows);
    });
  }

  clear(): void {
    this.carShows$ = [];
  }
}
