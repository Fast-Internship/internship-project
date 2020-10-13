import { Injectable, OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class PaginationService implements OnInit {

  current_page_index: number = 0;
  currentPage: number = 1;
  next: string = "Next";
  previous: string = "Previous";

  constructor() { }


  ngOnInit() {}

  createPagination(pagination_buttons: number[], pages: number) {
    for (let i = 1; i <= pages; i++) {
      pagination_buttons.push(i);
    }
  }
  
  changePage(e){
      this.current_page_index = +e.target.innerHTML-1;  
      this.currentPage = this.current_page_index + 1; 
      return this.current_page_index+1;    
  }

  nextPage(pages){
    if(this.current_page_index === pages-1){
      return this.current_page_index;
    } else {
      return ++this.current_page_index;
    }
  }

  getCurrentPage() {
    return this.currentPage;
  }

  previousPage(){
    if(this.current_page_index === 0){
      return this.current_page_index;
    } else {
      return --this.current_page_index;
    }
  }
}
