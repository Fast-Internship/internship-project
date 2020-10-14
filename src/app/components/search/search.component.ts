import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/core/models/car.model';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { CarService } from 'src/app/core/services/car-service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() getFilteredCars = new EventEmitter<Car[]>();
  searchFormGroup: FormGroup;
  cars: Car[] = [];
  brand: string;
  class: string;
  model: string;
  date: string;
  horsepower: string;
  transmission: string;
  filteredByBrand: any;
  pagination_buttons: number[] = [];


  constructor(private carService: CarService) {

  }

  ngOnInit(): void {
    //this.cars = JSON.parse(localStorage.getItem('carsArray'));
    this.searchFormGroup = new FormGroup({
      Brand: new FormControl('', Validators.required),
      Class: new FormControl('', Validators.required),
      Model: new FormControl('', Validators.required),
      Date: new FormControl('', Validators.required),
      Horsepower: new FormControl('', Validators.required),
      Transmission: new FormControl('', Validators.required),


    })
    
  }

  onSubmit() {

    const inputNames = Object.keys(this.searchFormGroup.controls);
    this.carService.fetchCars().subscribe(searchedCars =>{
      this.cars = searchedCars;
      inputNames.forEach(name => {
        if (this.searchFormGroup.controls[name].status === "VALID") {
          searchedCars = searchedCars.filter((car) => {
            console.log(car[name].toLowerCase().match(this.searchFormGroup.value[name].toString().toLowerCase())) 
          return car[name].toLowerCase().match(this.searchFormGroup.value[name].toString().toLowerCase());
          })
        }
        
      console.log(searchedCars)
      })
    this.getFilteredCars.emit(searchedCars);
    })
  }

}
