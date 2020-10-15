import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate {

    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
        return !!localStorage.getItem('user') 
    }
}