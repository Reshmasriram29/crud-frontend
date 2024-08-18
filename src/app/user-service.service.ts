import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id?: string,
  firstname: string;
  lastname: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor(private http: HttpClient) { }
  
  private apiUrl = 'http://localhost:3000/api'; // Replace with your API URL

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  viewUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  viewOneUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  editUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteOneUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
