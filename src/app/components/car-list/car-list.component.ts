import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car-service';
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit, DoCheck {
  carsArray: Car[];
  carTitles: Array<string> = [
    'Brand',
    'Class',
    'Date',
    'Horsepower',
    'Model',
    'Transmission',
  ];
  slicedCars: Car[];
  pages: number;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.carService.fetchCars().subscribe((carsArray) => {
      this.carsArray = carsArray;
      this.pages = Math.ceil(carsArray.length / this.carService.rows);
    });
  }

  ngDoCheck() {
    this.slicedCars = this.carService.sliceCars(this.carsArray);
  }

  goToAddCarPage() {
    this.router.navigate(['add-car']);
  }
}
