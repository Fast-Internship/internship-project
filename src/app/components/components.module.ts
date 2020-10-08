import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './car-list/car-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CarListComponent,
    PaginationComponent,
    EditListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule

  ],
  exports: [
    CarListComponent,
    PaginationComponent,
    EditListComponent
  ]
})
export class ComponentsModule { }
