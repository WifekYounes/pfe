import { Injectable } from '@angular/core';
import{Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,UrlTree} from '@angular/router';
import{Observable} from 'rxjs';
import {UserServiceService} from'../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private router:Router,private userService: UserServiceService)
  { }

  canActivate( next:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean |UrlTree> | Promise<boolean  |
  UrlTree> |boolean | UrlTree {


     if ((sessionStorage.getItem('subuser')!=null) )
      {

        alert(' FORBIDDEN CLIENT ACCESS  !!');
        this.router.navigate(['/subuserdashboard/map']);

            return false;
       }

       else if ((sessionStorage.getItem('admin')!=null) )
       {

         alert(' FORBIDDEN CLIENT ACCESS  !!');
         this.router.navigate(['/admindashboard/card']);

             return false;
        }



        else if ((sessionStorage.getItem('auth-token')==null) )
        {

          alert(' FORBIDDEN CLIENT ACCESS  !!');
          this.router.navigate(['/login']);

              return false;
         }




         return true;





  }
}


