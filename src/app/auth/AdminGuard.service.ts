import { Injectable } from '@angular/core';
import{Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,UrlTree} from '@angular/router';
import{Observable} from 'rxjs';
import {AdminServiceService} from'../services/admin-service.service';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AdminGuardService implements CanActivate {
  constructor(private router:Router,private adminService: AdminServiceService,private authService: AuthService)
  { }

  canActivate( next:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean |UrlTree> | Promise<boolean  |
  UrlTree> |boolean | UrlTree {

    if ((sessionStorage.getItem('subuser')!=null) )
    {

      alert(' FORBIDDEN ADMIN ACCESS  !!');
      this.router.navigate(['/subuserdashboard/map']);

          return false;
     }

     else if ((sessionStorage.getItem('user')!=null) )
     {

       alert(' FORBIDDEN ADMIN ACCESS  !!');
       this.router.navigate(['/dashboard/map']);

           return false;
      }



      else if ((sessionStorage.getItem('auth-token')==null) )
      {

        alert(' FORBIDDEN ADMIN ACCESS  !!');
        this.router.navigate(['/login']);

            return false;
       }




       return true;





}
}


