import {  Component, ViewChild, enableProdMode, AfterViewInit }  from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { DxDrawerComponent } from 'devextreme-angular/ui/drawer';
import { AdminServiceService } from 'src/app/services/admin-service.service';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;

    selectedOpenMode: string = 'shrink';
    selectedPosition: string = 'left';
    selectedRevealMode: string = 'slide';
    isDrawerOpen: Boolean = true;
    elementAttr: any;
    admin:any;
    popuplOGOUT = false;
    subuser:any;

    constructor(private router: Router,private adminService: AdminServiceService) {


    }


    ngOnInit() {
      this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
      this.adminService.getAdmin(this.subuser.cin).subscribe(
        data => {
          this.admin=data;
          sessionStorage.setItem('admin', JSON.stringify(this.admin));
         // console.log("roleeeee"+this.subuser.roles)
        },

        err => console.log(err));






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




         logout(){
          window.sessionStorage.clear();
          this.router.navigate(['/login']);

        }


        stay(){
          this.popuplOGOUT=false;
        }
}
