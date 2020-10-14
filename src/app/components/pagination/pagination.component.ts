import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges{

  @Input() pages:number;

  pagination_buttons: number[] = [];
  current_page: number = 1;

  constructor(private paginationService: PaginationService) { }

  ngOnInit(): void {

  }
  changePage(e){
    this.current_page = this.paginationService.changePage(e)
  }
  
  ngOnChanges(){
    this.pagination_buttons = [];
    this.paginationService.createPagination(this.pagination_buttons, this.pages);
  }

}
