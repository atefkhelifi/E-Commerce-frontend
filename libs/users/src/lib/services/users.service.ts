import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@env/environment.development';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrlUsers = environment.apiUrl + 'users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUsers);
  }
  getUserId(userId: string): Observable<User> {
    return this.http.get<User>(this.apiUrlUsers + `/${userId}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlUsers, user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrlUsers + '/' + user.id, user);
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrlUsers + `/${userId}`);
  }
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
}
