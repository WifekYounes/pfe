import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubuserserviceService {

  private API_URL='http://localhost:9191/api/bws/subuser';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  reportAlertRef(cin:Number,reference:String):Observable<any>
  {return this.http.get(`${this.API_URL}/report/alert/${cin}/${reference}`); }

  reportHistorytRef(cin:Number,reference:String):Observable<any>
  {return this.http.get(`${this.API_URL}/report/history/${cin}/${reference}`); }

  reportHistoryAlertRef(cin:Number,reference:String):Observable<any>
  {return this.http.get(`${this.API_URL}/report/historyAlert/${cin}/${reference}`); }


  listSpaces(cin:Number):Observable<any>
  {return this.http.get(`${this.API_URL}/spaces/${cin}`); }

  listDevices(cin:Number):Observable<any>
  {return this.http.get(`${this.API_URL}/devices/${cin}`); }


  getRTValues(reference:String):Observable<any>
  {return this.http.get(`${this.API_URL}/rt/${reference}`); }
}
