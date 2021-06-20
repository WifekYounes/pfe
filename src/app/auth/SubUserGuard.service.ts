import { Injectable } from '@angular/core';
import{Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,UrlTree} from '@angular/router';
import{Observable} from 'rxjs';
import {SubuserserviceService} from'../services/subuserservice.service';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class SubUserGuardService {

  constructor(private router:Router,private subUserService: SubuserserviceService,private authService: AuthService)
  { }

  canActivate( next:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean |UrlTree> | Promise<boolean  |
  UrlTree> |boolean | UrlTree {
    if ((sessionStorage.getItem('admin')!=null) )
    {

      alert(' FORBIDDEN EMPLOYEE ACCESS  !!');
      this.router.navigate(['/admindashboard/card']);

          return false;
     }

     else if ((sessionStorage.getItem('user')!=null) )
     {

       alert(' FORBIDDEN EMPLOYEE ACCESS  !!');
       this.router.navigate(['/dashboard/map']);

           return false;
      }



      else if ((sessionStorage.getItem('auth-token')==null) )
      {

        alert(' FORBIDDEN EMPLOYEE ACCESS  !!');
        this.router.navigate(['/login']);

            return false;
       }




       return true;





}
}


