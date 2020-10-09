import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  id: string
  choosenCar: any
  profileForm: FormGroup
  cars: any[]

  constructor(private activateRoute: ActivatedRoute,  private router: Router) { 
    this.id = activateRoute.snapshot.params['key'];
  }

  ngOnInit(): void {
    this.cars = JSON.parse(localStorage.getItem('carsArray'));
    this.choosenCar = this.cars.find(x => x.id == (this.id));
    this.profileForm = new FormGroup ({
      Brand: new FormControl(this.choosenCar.Brand),
      Model: new FormControl(this.choosenCar.Model),
      Class: new FormControl(this.choosenCar.Class),
      Date: new FormControl(this.choosenCar.Date),
      Transmission: new FormControl(this.choosenCar.Transmission),
      Horsepower: new FormControl(this.choosenCar.Horsepower)
    })
  }

  onSubmit(): void {
    const choosenCarIndex: number = this.cars.findIndex(x => x.id == (this.id));
    this.cars[choosenCarIndex] = {...this.profileForm.value, id: this.choosenCar.id}; //({ ...responseData[key], id: key })
    console.log(this.cars[choosenCarIndex])
    localStorage.setItem('carsArray', JSON.stringify(this.cars));
    this.router.navigate(['car-list'])
  }

}
