import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './car-list/car-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AddCarComponent } from './add-car/add-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CarListComponent, PaginationComponent, AddCarComponent],
  imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CarListComponent, PaginationComponent, AddCarComponent],
})
export class ComponentsModule {}
