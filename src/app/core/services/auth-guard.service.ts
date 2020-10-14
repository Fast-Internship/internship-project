import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  userLoggedIn = !!JSON.parse(localStorage.getItem('user'));
  routeURL: string;

  constructor(private router: Router) {
    this.routeURL = this.router.url;
  }

  canActivate() {
    if (this.userLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
