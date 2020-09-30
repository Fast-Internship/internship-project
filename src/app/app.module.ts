import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './core/services/auth.service';
import { MenuComponent } from './components/menu/menu.component';
import { CarListComponent } from './components/car-list/car-list.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, CarListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AuthModule,    
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
