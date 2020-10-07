import { Component, Input, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pages:number;

  pagination_buttons: number[] = [];
  current_page: number = 1;

  constructor(private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.paginationService.createPagination(this.pagination_buttons, this.pages);
  }
  changePage(e){
    this.current_page = this.paginationService.changePage(e)
  }
}
