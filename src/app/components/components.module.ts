import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarListComponent } from './car-list/car-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslationPipe } from '../core/pipes/translation.pipe';



@NgModule({
  declarations: [
    CarListComponent,
    PaginationComponent,
    TranslationPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  exports: [
    CarListComponent,
    PaginationComponent,
    TranslationPipe
  ]
})
export class ComponentsModule { }
