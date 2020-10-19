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
import { SearchComponent } from './search/search.component';
import { ModalComponent } from './modal/modal.component';
import { RefDirective } from './modal/ref.directive';


@NgModule({
  declarations: [
    CarListComponent,
    PaginationComponent,
    TranslationPipe,
    AddCarComponent,
    EditListComponent,
    SearchComponent,
    ModalComponent,
    RefDirective

  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: [ModalComponent],
  exports: [
    CarListComponent,
    PaginationComponent,
    TranslationPipe,
    AddCarComponent,
    EditListComponent,
    SearchComponent
  ],
})
export class ComponentsModule {}
