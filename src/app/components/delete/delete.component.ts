import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  carsArray;
  filteredCarsArray;
  deletedArray;
  i
  @Input() id: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  deleteLine() {
    if (confirm("Are you sure you want to permanently remove this item?")) {
      this.carsArray = JSON.parse(localStorage.getItem("carsArray"))
      this.filteredCarsArray = this.carsArray.filter(car => car.id !== this.id)
      localStorage.setItem('carsArray', JSON.stringify(this.filteredCarsArray))
      this.carsArray = this.filteredCarsArray
    } 

    console.log(this.carsArray[1])
  }
} 