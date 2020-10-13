import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './car-list/car-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationPipe } from '../core/pipes/translation.pipe';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    CarListComponent,
    PaginationComponent,
    TranslationPipe,
    DeleteComponent,
    AddCarComponent,
    EditListComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CarListComponent,
    PaginationComponent,
    TranslationPipe,
    AddCarComponent,
    EditListComponent,
  ],
})
export class ComponentsModule {}
