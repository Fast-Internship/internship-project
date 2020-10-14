import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SharedModule,
    AuthModule,
    RouterModule,  
    AppRoutingModule,
    ComponentsModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
