import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/core/services/car-service';
import { Constants } from '../../constants/constants';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  ERROR_MESAGES = Constants.ERROR_MESAGES;
  id: string;
  chosenCar: any;
  carForm: FormGroup = new FormGroup ({
    Brand: new FormControl(''),
    Model: new FormControl(''),
    Class: new FormControl(''),
    Date: new FormControl(''),
    Transmission: new FormControl(''),
    Horsepower: new FormControl('')
  });
  cars: any[]

  constructor(private carService: CarService,  private router: Router, private http: HttpClient, private activateRoute: ActivatedRoute,) { 
    this.id = activateRoute.snapshot.params['key'];
  }

  ngOnInit(): void {
    this.carService.fetchCars()
    .subscribe(cars => {
      this.cars = cars;
      this.chosenCar = cars.find(x => x.id == (this.id));
      this.carForm = new FormGroup ({
        Brand: new FormControl(this.chosenCar.Brand, [Validators.required]),
        Model: new FormControl(this.chosenCar.Model, [Validators.required]),
        Class: new FormControl(this.chosenCar.Class, [
          Validators.required,
          noWhitespaceValidator,
        ]),
        Date: new FormControl(this.chosenCar.Date, [
          Validators.required,
          noWhitespaceValidator,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.max(2020),
        ]),
        Transmission: new FormControl(this.chosenCar.Transmission, [
          Validators.required,
          noWhitespaceValidator,
        ]),
        Horsepower: new FormControl(this.chosenCar.Horsepower, [
          Validators.required,
          noWhitespaceValidator,
          Validators.pattern(/^[0-9]\d*$/),
        ])
      })
    })   
  }

  onSubmit(){
    this.carService.editCar(this.cars, this.carForm, this.id, this.chosenCar);
  }

}
function noWhitespaceValidator(control: FormControl) {
  console.log(typeof (control.value))
  const isWhitespace = (control.value.toString() || '').includes(' ');
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
