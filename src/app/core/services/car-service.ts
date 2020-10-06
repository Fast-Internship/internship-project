import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  rows: number = 10;
  current_page: number = 1;
  // pages: number;
  // pagination_buttons: number[] = [];

  constructor(private http: HttpClient) {
  }


  sliceCars(carsArray) {
    this.current_page--;
    const start = this.rows * this.current_page;
    const end = start + this.rows;
    return carsArray.slice(start, end);
  }

  // createPagination() {
  //   for (let i = 1; i <= this.pages; i++) {
  //     this.pagination_buttons.push(i);
  //   }
  // }

  // changePage(e) {
  //   this.current_page = +e.target.innerHTML;
  //   this.sliceCars();
  // }

  fetchCars() {
    return this.http
      .get<{ [key: string]: Car }>('https://carlist-ffae2.firebaseio.com/cars.json')
      .pipe(map(
        responseData => {
          const postsArray: Car[] = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key })
            }
          }
          return postsArray;
        })
      )
  }

}
