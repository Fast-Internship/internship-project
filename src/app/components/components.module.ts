import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './car-list/car-list.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    CarListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  exports: [
    CarListComponent,
    PaginationComponent
  ]
})
export class ComponentsModule { }
