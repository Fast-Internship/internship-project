import { Injectable, OnInit } from '@angular/core';
import { CarService } from './car-service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService implements OnInit {
  currentPage: number = 1;

  constructor(private carService: CarService) {}

  ngOnInit() {}

  createPagination(pagination_buttons: number[], pages: number) {
    for (let i = 1; i <= pages; i++) {
      pagination_buttons.push(i);
    }
  }

  changePage(e) {
    this.carService.current_page_index = +e.target.innerHTML - 1;
    this.currentPage = this.carService.current_page_index + 1;
    return this.carService.current_page_index + 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
