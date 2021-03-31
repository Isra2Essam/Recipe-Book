import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authGuard:AuthService, private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot
        ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree{
            return this.authGuard.user.pipe(map(user=>{
                const isAuth = !!user;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            }))
        }

}