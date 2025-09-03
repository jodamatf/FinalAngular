import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { CreateUserDto } from './models/create-user.dto';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly api = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> { return this.http.get<User[]>(this.api); }
  createUser(dto: CreateUserDto): Observable<User> { return this.http.post<User>(this.api, dto); }
}
