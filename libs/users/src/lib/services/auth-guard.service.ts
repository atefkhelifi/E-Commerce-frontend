import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageToke: LocalStorageService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToke.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode);
      if (tokenDecode.isAdmin && this._isTokenExpired(tokenDecode.exp)) {
        console.log('test');
        return true;
      }
    }
    console.log('false');
    this.router.navigate(['/login']);
    return false;
  }
  private _isTokenExpired(exp: number): boolean {
    console.log(exp, new Date().getTime());
    return Math.floor(new Date().getTime()) >= exp;
  }
}
