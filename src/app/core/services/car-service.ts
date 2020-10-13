import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) {

  }

  sliceCars(carsArray: Car[]) {
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
  

  onSubmit(cars: Car[],profileForm: FormGroup,id: string,chosenCar: Car) {
    const chosenCarIndex: number = cars.findIndex(x => x.id == (id));
    cars[chosenCarIndex] = {...profileForm.value, id: chosenCar.id}; //({ ...responseData[key], id: key })
    this.router.navigate(['car-list']);
    return this.http
      .put<any>('https://carlist-ffae2.firebaseio.com/cars.json', cars, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .subscribe()
  }
}
