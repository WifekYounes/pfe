import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:9191/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {
ok:boolean;
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    this.ok=true;
    return this.http.post(API_URL + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
}
