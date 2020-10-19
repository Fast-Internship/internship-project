import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { PaginationService } from './pagination.service';


@Injectable({
  providedIn: 'root',
})
export class CarService {
  rows: number = 10;
  carsArray: Car[];
  

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService,
    private router: Router
  ) {}

  sliceCars(carsArray: Car[]) {
    if (carsArray) {
      const start = this.rows * this.paginationService.current_page_index;
      const end = start + this.rows;
      return carsArray.slice(start, end);
    }
  }

  fetchCars() {
    return this.http
      .get<any>('https://carlist-ffae2.firebaseio.com/cars.json')
      .pipe(
        map((responseData) => {
          this.carsArray = Object.values(responseData)
          return this.carsArray;
        })
      );
  }

  addNewCar(carData: Car) {
    const postData: Car = {...carData, id: this.generateUniqueID()};
    return this.http
      .post('https://carlist-ffae2.firebaseio.com/cars.json', postData)
      .subscribe((res: Car) => {
        this.carsArray = [...this.carsArray, postData]
        this.router.navigate(['car-list']);
      });
  }

  editCar(cars: Car[], carForm: FormGroup, id: string, chosenCar: Car) {
    const chosenCarIndex: number = cars.findIndex((x) => x.id == id);
    cars[chosenCarIndex] = { ...carForm.value, id: chosenCar.id };
    return this.http
      .put<any>('https://carlist-ffae2.firebaseio.com/cars.json', cars, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe((res) => {
        this.router.navigate(['car-list']);
      });
  }

  deleteCar(id) {
    const filteredCarsArray = this.carsArray.filter((car) => car.id !== id);
    this.addFilteredList(filteredCarsArray).subscribe();
    this.carsArray = filteredCarsArray;
  }

  addFilteredList(cars: Car[]) {
    return this.http.put<any>(
      'https://carlist-ffae2.firebaseio.com/cars.json',
      cars,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  returnCars(){
    return this.carsArray;
  }


  generateUniqueID(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
