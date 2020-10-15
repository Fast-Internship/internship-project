import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
    boolean | 
    UrlTree | 
    Promise<boolean | 
    UrlTree> | 
    Observable<boolean | 
    UrlTree> {

        const isAuth = !!localStorage.getItem('user')
        if(isAuth) {
            return true;
        } 
        return this.router.createUrlTree(['/login'])
    }
}