import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [ColumnOneComponent, HeaderComponent, ErrorComponent],
  imports: [CommonModule, RouterModule],
  exports: [ColumnOneComponent],
})
export class SharedModule {}
