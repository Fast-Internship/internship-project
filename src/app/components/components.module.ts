import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './car-list/car-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AddCarComponent } from './add-car/add-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationPipe } from '../core/pipes/translation.pipe';

@NgModule({
  declarations: [
    CarListComponent,
    PaginationComponent,
    TranslationPipe,
    AddCarComponent,
  ],
  imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CarListComponent,
    PaginationComponent,
    TranslationPipe,
    AddCarComponent,
  ],
})
export class ComponentsModule {}
