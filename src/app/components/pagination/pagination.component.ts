import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() pages: number;

  pagination_buttons: number[] = [];
  current_page: number = this.paginationService.getCurrentPage() || 1;
  next: string = 'Next';
  previous: string = 'Previous';

  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    
  }
  changePage(e) {
    this.current_page = this.paginationService.changePage(e);
  }

  nextPage(){
    this.current_page = this.paginationService.nextPage(this.pages)+1;
  }
  
  previousPage(){
    this.current_page = this.paginationService.previousPage()+1;
  }
  
  ngOnChanges(){
    this.pagination_buttons = [];
    this.paginationService.createPagination(this.pagination_buttons, this.pages);
  }

}
