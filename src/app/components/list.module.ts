import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './car-list/car-list.component';



@NgModule({
  declarations: [
    CarListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  exports: [
    CarListComponent
  ]
})
export class ListModule { }
