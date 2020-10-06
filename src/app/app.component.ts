import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-work';
  userLoggedIn: boolean;
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.userLoggedIn.subscribe((bool)=>{
      this.userLoggedIn = bool;
    })
  }
}