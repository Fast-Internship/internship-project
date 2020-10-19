import { Renderer2 } from '@angular/core';
import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car-service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit, DoCheck {
  //translate variables =====
  edit: string = 'edit';
  //===================
  div;
  isModalOpen: boolean = false;
  carsArray: Car[];
  carTitles: Array<string> = [
    'Brand',
    'Class',
    'Date',
    'Horsepower',
    'Model',
    'Transmission',
  ];
  slicedCars: Car[];
  pages: number;
  @ViewChild('container') container: ElementRef;
  @ViewChild('table') table: ElementRef;

  constructor(
    private carService: CarService,
    private router: Router,
    public route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.carService.fetchCars().subscribe((carsArray) => {
      this.carsArray = carsArray;
      this.pages = Math.ceil(carsArray.length / this.carService.rows);
    });
  }

  ngDoCheck() {
    this.slicedCars = this.carService.sliceCars(this.carsArray);
  }

  onSearchClick(filteredCars) {
    this.carsArray = filteredCars;
    this.pages = Math.ceil(this.carsArray.length / this.carService.rows);
  }

  goToAddCarPage() {
    this.router.navigate(['add-car']);
  }

  handleNavigationClick(id: string) {
    this.router.navigate(['edit-list', { key: id }]);
  }

  displayDeleteModal(id) {
    this.isModalOpen = true;
    this.div = this.renderer.createElement('div');
    this.table.nativeElement.classList.add('table-light');
    const buttonCancel = this.renderer.createElement('button');
    const buttonDelete = this.renderer.createElement('button');
    const text = this.renderer.createText(
      'Are you sure you want to permanently remove this item?'
    );
    buttonCancel.innerHTML = 'Cancel';
    buttonDelete.innerHTML = 'Delete';

    this.renderer.appendChild(this.div, text);
    this.renderer.appendChild(this.div, buttonCancel);
    this.renderer.appendChild(this.div, buttonDelete);
    this.container.nativeElement.appendChild(this.div);

    this.renderer.listen(buttonDelete, 'click', () => {
      this.table.nativeElement.classList.remove('table-light');
      this.carService.deleteCar(id);
      this.carsArray = this.carsArray.filter((car) => car.id !== id);
      this.div.remove();
      this.isModalOpen = false;
    });

    this.renderer.listen(buttonCancel, 'click', () => {
      this.table.nativeElement.classList.remove('table-light');
      this.div.remove();
      this.isModalOpen = false;
    });
    this.renderer.setAttribute(this.div, 'id', 'modal');
  }
}
