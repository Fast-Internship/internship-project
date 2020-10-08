import { CarService } from './../../core/services/car-service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent implements OnInit {
  addCarForm: FormGroup;
  ERROR_MESAGES = Constants.ERROR_MESAGES;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private carService: CarService
  ) {
    this._createForm();
  }

  _createForm() {
    this.addCarForm = this.fb.group({
      brand: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator,
        Validators.pattern(/^[0-9]\d*$/),
        Validators.min(1),
      ]),
      class: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator,
      ]),
      horsepower: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator,
      ]),
      transmission: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator,
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.addCarForm.value);
    const car = {
      Brand: this.addCarForm.value.brand,
      Class: this.addCarForm.value.class,
      Date: this.addCarForm.value.date,
      Horsepower: this.addCarForm.value.horsepower,
      Model: this.addCarForm.value.model,
      Transmission: this.addCarForm.value.transmission,
    };
    this.carService.addNewCar(car);
  }
  goToCarList() {
    this.router.navigate(['car-list']);
  }
}

function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').includes(' ');
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
