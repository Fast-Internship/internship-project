import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
@NgModule({
  declarations: [ColumnOneComponent, HeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterModule,  AuthRoutingModule, AppRoutingModule],
  exports: [ColumnOneComponent],
})
export class SharedModule {}
