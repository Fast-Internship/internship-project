import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { PaginationService } from './pagination.service';
import { Observable } from 'rxjs';

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
          const postsArray: Car[] = [];
          for (let key in responseData) {
            postsArray.push({ ...responseData[key], id: key });
          }
          this.carsArray = postsArray;
          return postsArray;
        })
      );
  }

  addNewCar(carData) {
    const postData: Car = carData;
    return this.http
      .post('https://carlist-ffae2.firebaseio.com/cars.json', postData)
      .subscribe((res: Car) => {
        this.router.navigate(['car-list']);
      });
  }

  editCar(cars: Car[], carForm: FormGroup, id: string, chosenCar: Car) {
    const chosenCarIndex: number = cars.findIndex((x) => x.id == id);
    cars[chosenCarIndex] = { ...carForm.value, id: chosenCar.id }; //({ ...responseData[key], id: key })
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
}
