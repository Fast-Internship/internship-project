import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/core/services/car-service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  id: string
  chosenCar: any
  profileForm: FormGroup
  cars: any[]

  constructor(private carService: CarService,  private router: Router, private http: HttpClient, private activateRoute: ActivatedRoute,) { 
    this.id = activateRoute.snapshot.params['key'];
  }

  ngOnInit(): void {

    this.carService.fetchCars()
    .subscribe(cars => {
      this.cars = cars;
      this.chosenCar = cars.find(x => x.id == (this.id));
      this.profileForm = new FormGroup ({
        Brand: new FormControl(this.chosenCar.Brand),
        Model: new FormControl(this.chosenCar.Model),
        Class: new FormControl(this.chosenCar.Class),
        Date: new FormControl(this.chosenCar.Date),
        Transmission: new FormControl(this.chosenCar.Transmission),
        Horsepower: new FormControl(this.chosenCar.Horsepower)
      })

    })
    
  }

  onSubmit(){
    this.carService.onSubmit(this.cars, this.profileForm, this.id, this.chosenCar);
  }

}