import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrlUsers = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient,
    private token: LocalStorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrlUsers + '/login', {
      email,
      password,
    });
  }
  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
