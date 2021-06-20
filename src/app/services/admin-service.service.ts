import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Administrator}from'../models/administrator';
import { SignUpRequest}from'../models/sign-up-request';
import { User } from '../models/user';
import { UrlSerializer } from '@angular/router';
import { Device } from '../models/device';
import { UserDevice } from '../models/user-device';
import { ConstraintCo2 } from '../models/constraint-co2';
import { Area } from '../models/area';
import { Space } from '../models/space';
import { ClientArea } from '../models/client-area';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  public popupspace:boolean=false;
  public popuparea:boolean=false;
  public lat:number=0;
  public lng:number=0;
  public geojson:string='';

  private API_URL='http://localhost:9191/api/bws/admin';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

/*******GET ADMIN ******* */
getAdmin(cin:number):Observable<any>
{return this.http.get(`${this.API_URL}/${cin}`); }

/***** DEVICE MANAGMENT ***** */
deleteDevice(ref:string):Observable<any>{
  return this.http.delete(`${this.API_URL}/device/delete/${ref}`,{ responseType: 'text' });
}

addDevice(d:any):Observable<any>{
  return this.http.post(`${this.API_URL}/device/add`,d);

}

updateDevice(reference:string,d:Device):Observable<any>{
  return this.http.put(`${this.API_URL}/device/update/${reference}`,d);
}

updateDeviceCT(reference:string,d:Device):Observable<any>{
  return this.http.put(`${this.API_URL}/device/ct/update/${reference}`,d);
}


listdevices():Observable<any>
 {return this.http.get(`${this.API_URL}/device/all`);}

 listdevicesNull():Observable<any>
 {return this.http.get(`${this.API_URL}/devicesNull/all`);}


listdevicesByIDCT():Observable<any>
{return this.http.get(`${this.API_URL}/device/ct/all`);}

getDeviceByRef(ref:string):Observable<any>
{return this.http.get(`${this.API_URL}/device/${ref}`);}

/********* USER MANGMENT
 * list,get- get
 * add,update -post
 * delete -delete
 * ***** */
deleteUser(cin:number):Observable<any>
{return this.http.delete(`${this.API_URL}/user/delete/${cin}`,{ responseType: 'text' });}

addUser(signUpRequest):Observable<any>
{return this.http.post(`${this.API_URL}/user/add`,signUpRequest);}

listUsers():Observable<any>

{return this.http.get(`${this.API_URL}/user/all`);}

getUserByCin(cin:number):Observable<any>
{return this.http.get(`${this.API_URL}/user/${cin}`);}

/************** USER DEVIVCE MANAGMENT*********** */

affectUserDevice(ud:UserDevice):Observable<any>
{return this.http.post(`${this.API_URL}/userDevices/add`,ud);}

listUserDevices():Observable<any>
{return this.http.get(`${this.API_URL}/userDevices/all`);}


deleteUserDevices(cinu:Number,reference:String):Observable<any>{
  return this.http.delete(`${this.API_URL}/userDevices/delete/${cinu}/${reference}`,{ responseType: 'text' });}


/************* CONSTRAINT CO2 MANGMENT ****** */

addConstraint(c:ConstraintCo2):Observable<any>
{return this.http.post(`${this.API_URL}/constraint/add`,c);}

getConstraint(idConstraint:Number):Observable<any>
{return this.http.get(`${this.API_URL}/constraint/${idConstraint}`);}

updateConstraint(idConstraint:Number,c:ConstraintCo2):Observable<any>
{return this.http.put(`${this.API_URL}/constraint/update/${idConstraint}`,c);}

listConstraints():Observable<ConstraintCo2[]>
{return this.http.get<ConstraintCo2[]>(`${this.API_URL}/constraint/all`);}

deleteConstraint(idConstraint:Number):Observable<any>{
  return this.http.delete(`${this.API_URL}/constraint/delete/${idConstraint}`,{ responseType: 'text' });}

/********** AREA MANGMENT ***** */

addArea(a:any):Observable<any>
{ console.log("xxxxxx"+a);
  return this.http.post(`${this.API_URL}/area/add`,a);
}

listAreas():Observable<Area[]>
{return this.http.get<Area[]>(`${this.API_URL}/area/all`);}

deleteArea(idArea:Number):Observable<any>{
  return this.http.delete(`${this.API_URL}/area/delete/${idArea}`,{ responseType: 'text' });}

/*****Space Management***** */
addSpace(s:any):Observable<any>
{
  return this.http.post(`${this.API_URL}/space/add`,s);}

getSpace(idSpace:Number):Observable<any>
{return this.http.get(`${this.API_URL}/space/${idSpace}`);}

listSpaces():Observable<any>
{return this.http.get(`${this.API_URL}/space/all`);}

deleteSpace(idSpace:Number):Observable<any>{
  return this.http.delete(`${this.API_URL}/space/delete/${idSpace}`,{ responseType: 'text' });}


  updateSpace(idSpace:Number,s:Space):Observable<any>
  {return this.http.put(`${this.API_URL}/space/update/${idSpace}`,s);}

/************** CLIENT Area MANAGMENT*********** */

affectUserArea(ca:ClientArea):Observable<any>
{return this.http.post(`${this.API_URL}/clientArea/add`,ca);}

listUserAreas():Observable<any>
{return this.http.get(`${this.API_URL}/clientArea/all`);}

deleteUserAreas(cinu:Number,idArea:Number):Observable<any>{
  return this.http.delete(`${this.API_URL}/clientArea/delete/${cinu}/${idArea}`,{ responseType: 'text' });}



  //**Real Time managment */
  getRTValues(reference:String):Observable<any>
{return this.http.get(`${this.API_URL}/rt/${reference}`); }

getDeviceRT_LastValue(reference:String):Observable<any>
{return this.http.get(`${this.API_URL}/device_rt/${reference}`); }
}
