import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './car-list/car-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    CarListComponent,
    PaginationComponent,
    DeleteComponent
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
