import { Injectable } from '@angular/core';

const TOKEN = 'jwToken';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }
  getToken(): any {
    return localStorage.getItem(TOKEN);
  }
  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
