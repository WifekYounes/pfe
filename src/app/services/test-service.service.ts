import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubUser } from '../models/SubUser';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  private API_URL='http://localhost:9191/api/test';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  updateProfile(cin:number,su:any):Observable<any>
  {
    return this.http.put(`${this.API_URL}/${cin}/updateProfile`,su);

  }

  resetPassword(email:String):Observable<any>
  {return this.http.get(`${this.API_URL}/resetpassword/${email}`,{ responseType: 'text' });}

}
