import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  rows: number = 10;
  current_page_index: number = 0;
  pages: number;
  carsArray: Car[];

  constructor(private http: HttpClient, private router: Router) {}

  sliceCars(carsArray) {
    if (carsArray) {
      const start = this.rows * this.current_page_index;
      const end = start + this.rows;
      return carsArray.slice(start, end);
    }
  }

  fetchCars() {
    return this.http
      .get<any>('https://carlist-ffae2.firebaseio.com/cars.json')
      .pipe(
        map((responseData) => {
          console.log(responseData);
          const postsArray: Car[] = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key) && responseData[key]) {
              if (responseData[key]) {
                postsArray.push({ ...responseData[key], id: key });
              }
            }
          }
          return postsArray;
        })
      );
  }

  addNewCar(carData) {
    this.carsArray = JSON.parse(localStorage.getItem('carsArray'));
    const postData: Car = carData;
    return this.http
      .post('https://carlist-ffae2.firebaseio.com/cars.json', postData)
      .subscribe((res: Car) => {
        this.carsArray.push(postData);
        localStorage.setItem('carsArray', JSON.stringify(this.carsArray));
        this.router.navigate(['car-list']);
      });
  }
}
