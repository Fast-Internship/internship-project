import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car-service'

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, DoCheck {
  carsArray: Car[];
  carListObj_Keys:Array<string>;
  slicedCars: Car[];
  pages: number;


  constructor(private carService: CarService) { 
  }

  ngOnInit(): void {
    this.carService.fetchCars()
      .subscribe(carsArray => {
        this.carsArray = carsArray;
        this.carListObj_Keys = Object.keys(carsArray[0]);
        this.pages = Math.ceil(carsArray.length / this.carService.rows);
      });         
  }

  ngDoCheck() {
    this.slicedCars = this.carService.sliceCars(this.carsArray);
  }
}