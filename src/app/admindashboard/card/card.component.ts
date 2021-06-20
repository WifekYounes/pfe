import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { WebSocketAPI3 } from 'src/app/WebSocketAPI3';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
nbclient:number;

users=[];
devices=[];
constraitns=[]
spaces=[];
areas=[];
nbconstaint:number;
nbspace:number;
nbarea:number;
  nbdevices: number;
  constructor(private adminService : AdminServiceService) {

   }

  ngOnInit(): void {
   this.listAr();
   this.listCons();
   this.listDev();
   this.listUs();
   this.listSpaces();



  }


  listUs(){
   this.adminService.listUsers().subscribe(
      data=>{
        this.users=data;
        this.nbclient=this.users.length;
      }
    )

  }



  listAr(){
    this.adminService.listAreas().subscribe(
       data=>{
         this.areas=data;
         this.nbarea=this.areas.length;
       }
     )

   }



   listCons(){
    this.adminService.listConstraints().subscribe(
       data=>{
         this.constraitns=data;
         this.nbconstaint=this.constraitns.length;
       }
     )

   }



   listSpaces(){
    this.adminService.listSpaces().subscribe(
       data=>{
         this.spaces=data;
         this.nbspace=this.spaces.length;
       }
     )

   }


   listDev(){
    this.adminService.listdevices().subscribe(
       data=>{
         this.devices=data;
         this.nbdevices=this.devices.length;
       }
     )

   }


}
