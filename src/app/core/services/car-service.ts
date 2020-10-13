import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { PaginationService } from './pagination.service'

@Injectable({
  providedIn: 'root',
})
export class CarService {
  rows: number = 10;
  carsArray: Car[];

  constructor(private http: HttpClient, private paginationService: PaginationService) {  }

  sliceCars(carsArray) {
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
            if (responseData.hasOwnProperty(key) && responseData[key]) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }
}
