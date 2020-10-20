import { ModalComponent } from './../modal/modal.component';
import { ComponentFactoryResolver, Renderer2 } from '@angular/core';
import {
  Component, DoCheck, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car-service';
import { TranslationPipe } from 'src/app/core/pipes/translation.pipe'
import { RefDirective } from '../modal/ref.directive';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  providers: [
    TranslationPipe
  ],
})
export class CarListComponent implements OnInit, DoCheck {
  //translate variables =====
  edit: string = 'edit';
  delete: string = 'delete';
  cancel: string = 'cancel';
  delete_message: string = 'delete_message';
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
  @ViewChild(RefDirective, { static: false }) refDir: RefDirective

  constructor(
    // private translationPipe: TranslationPipe,
    // private renderer: Renderer2,
    private carService: CarService,
    private router: Router,
    public route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.carService.fetchCars().subscribe((carsArray) => {
      this.carsArray = carsArray;
      this.pages = Math.ceil(carsArray.length / this.carService.rows);
    });
  }

  ngDoCheck() {
    this.slicedCars = this.carService.sliceCars();
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

  showModal(id) {
    console.log("ddddddtt")
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent)
    this.refDir.containerRef.clear()

    const component = this.refDir.containerRef.createComponent(modalFactory)
    component.instance.title = ' Are you shure you want to delete this item?'
    component.instance.onDelete.subscribe(() => {
      this.carService.deleteCar(id);
      this.refDir.containerRef.clear();
    })
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear()
    })

  }

  // displayDeleteModal(id) {
  //   this.isModalOpen = true;
  //   this.div = this.renderer.createElement('div');
  //   this.div.classList.add('delete-modal')
  //   this.table.nativeElement.classList.add('table-light');
  //   const buttonCancel = this.renderer.createElement('button');
  //   buttonCancel.classList.add('btn','btn-secondary')
  //   const buttonDelete = this.renderer.createElement('button');
  //   buttonDelete.classList.add('btn','btn-danger')
  //   const text = this.renderer.createText(this.translationPipe.transform(this.delete_message));
  //   buttonCancel.innerHTML = this.translationPipe.transform(this.cancel);
  //   buttonDelete.innerHTML = this.translationPipe.transform(this.delete);

  //   this.renderer.appendChild(this.div, text);
  //   this.renderer.appendChild(this.div, buttonCancel);
  //   this.renderer.appendChild(this.div, buttonDelete);
  //   this.container.nativeElement.appendChild(this.div);

  //   this.renderer.listen(buttonDelete, 'click', () => {
  //     this.table.nativeElement.classList.remove('table-light');
  //     this.carService.deleteCar(id);
  //     this.carsArray = this.carsArray.filter((car) => car.id !== id);
  //     this.div.remove();
  //     this.isModalOpen = false;
  //   });

  //   this.renderer.listen(buttonCancel, 'click', () => {
  //     this.table.nativeElement.classList.remove('table-light');
  //     this.div.remove();
  //     this.isModalOpen = false;
  //   });
  //   this.renderer.setAttribute(this.div, 'id', 'modal');
  // }

}
