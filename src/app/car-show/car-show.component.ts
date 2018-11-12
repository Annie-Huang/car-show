import { Component, OnInit } from '@angular/core';
import {CarShowService} from './services/car-show.service';
import {CarWithShowInfo} from './services/car-with-show-info';

@Component({
  selector: 'app-car-show',
  templateUrl: './car-show.component.html',
  styleUrls: ['./car-show.component.scss']
})
export class CarShowComponent implements OnInit {

  carWithShowInfoList$: CarWithShowInfo[] = [];

  constructor(private carShowService: CarShowService) { }

  ngOnInit() {
  }

  getCarListWithShowInfo(): void {
    this.carShowService.getShows().subscribe(shows => {
      this.carWithShowInfoList$ = this.carShowService.generateCarWithShowInfoListFromShows(shows);
    });
  }
}
