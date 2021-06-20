import {  Component, ViewChild, enableProdMode, AfterViewInit }  from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { DxDrawerComponent } from 'devextreme-angular/ui/drawer';
import { UserServiceService } from '../services/user-service.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [],
})
export class DashboardComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;
    user:any;
    subuser:any;
    selectedOpenMode: string = 'shrink';
    selectedPosition: string = 'left';
    selectedRevealMode: string = 'slide';
    isDrawerOpen: Boolean = true;
    elementAttr: any;
    popuplOGOUT = false;
    constructor(private router: Router,private userService: UserServiceService) {


    }
    // {

    //   widget: 'dxButton',
    //   location: 'before',
    //   options: {
    //       icon: 'menu',
    //       onClick: () => this.isDrawerOpen = !this.isDrawerOpen
    //  } },
    toolbarContent = [{
        widget: 'dxButton',
        location: 'before',
        options: {
            icon: 'runner',
          onClick: () => this.popuplOGOUT=true
        }
       } ];


    ngOnInit() {
      this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
      this.userService.getuserBySubUser(this.subuser.cin).subscribe(
        data => {
          this.user=data;
          sessionStorage.setItem('user', JSON.stringify(this.user));

        },

        err => console.log(err));
    }


    logout(){
      window.sessionStorage.clear();
      this.router.navigate(['/login']);

    }


    stay(){
      this.popuplOGOUT=false;
    }
}
