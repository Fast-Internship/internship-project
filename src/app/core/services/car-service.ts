import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  rows: number = 10;
  current_page_index: number = 0;
  pages: number;
  carsArray: Car[];
  // @Input() id: any;

  constructor(private http: HttpClient, private router: Router) { }

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
    const postData: Car = carData;
    return this.http
      .post('https://carlist-ffae2.firebaseio.com/cars.json', postData)
      .subscribe((res: Car) => {
        this.router.navigate(['car-list']);
      });
  }

  onSubmit(cars: Car[], profileForm: FormGroup, id: string, chosenCar: Car) {
    const chosenCarIndex: number = cars.findIndex((x) => x.id == id);
    cars[chosenCarIndex] = { ...profileForm.value, id: chosenCar.id }; //({ ...responseData[key], id: key })
    this.router.navigate(['car-list']);
    return this.http
      .put<any>('https://carlist-ffae2.firebaseio.com/cars.json', cars, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe();
  }

  deleteCar(id) {
    return this.http.get<any>('https://carlist-ffae2.firebaseio.com/cars.json').subscribe(car => (car.splice(id, 1)))

    //console.log( this.carsArray.splice(id, 1))
  }
}
