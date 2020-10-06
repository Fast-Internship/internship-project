import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './core/services/auth.service';
import { CarListComponent } from './components/car-list/car-list.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, CarListComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SharedModule,
    AuthModule,
    RouterModule,  
    AuthRoutingModule, 
    AppRoutingModule    
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
