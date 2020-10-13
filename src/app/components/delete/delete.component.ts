import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarService } from 'src/app/core/services/car-service'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  //filteredCarsArray;

  @Input() id: any;
  @Output() filteredList: EventEmitter<any> = new EventEmitter()

  constructor(
    private http: HttpClient,
    private carService: CarService,
  ) { }

  ngOnInit() { }

  removeLine() {
    // if (confirm("Are you sure you want to permanently remove this item?")) {
    //   this.http.put(`https://carlist-ffae2.firebaseio.com/cars/${this.id}`,null,{headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // })
    //     .subscribe(() => {
    //      //this.filteredCarsArray = this.filteredCarsArray.filter(car => car.id !== this.id)
    //     })
    // }
    // // this.filteredList.emit(this.filteredCarsArray)

    this.carService.deleteCar(this.id)
  }
} 