import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car-service'

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  carList: Car[];
  carListObj_Keys:Array<string>;
  slicedCars: Car[];
  
  constructor(private carService: CarService) { 

  }

  ngOnInit(): void {
    this.carService.fetchCars()
    .subscribe(cars=>{
      this.carList = cars;
      this.carListObj_Keys = Object.keys(this.carList[0]);
      this.slicedCars = this.carService.sliceCars(this.carList)
      console.log(this.slicedCars)
    }); 
  }

}