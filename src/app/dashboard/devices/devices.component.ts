import { Component, OnInit,OnChanges, ViewChild } from '@angular/core';
import { Device } from 'src/app/models/device';
import { UserServiceService } from 'src/app/services/user-service.service';
import notify from 'devextreme/ui/notify';
import { Space } from 'src/app/models/space';
import { ConstraintCo2 } from 'src/app/models/constraint-co2';
import { RtCo2 } from 'src/app/models/rt-co2';
import {DxFormComponent } from 'devextreme-angular';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { WebSocketAPI2 } from 'src/app/WebSocketAPI2';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit{
//  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent
device:any;
webSocketAPI2: WebSocketAPI2;
//img: any[] = [];
dev:any={}; long:any;lat:any;
currentDevice: any;
popupVisible = false;
popupUpdate = false;
values:any;
dc2:any;
vc2:any;
name:String;
minv:Number;
maxv:Number;
user:any;
subuser:any;
RT:any;
namex:String;
idSpace:Number;
idConstraint:Number;
imageurl:String;
ss:String[]=[];
l:any={};
r:any={};

tab:any=[];
real:any=[]
popupAdd = false;
popupDelete = false;
space:Space;
realtime:any;
constraint:ConstraintCo2;
dataSource = [];
spaces: Space[] = [];
nameS:any;
cinu:number;

nameC:String;
reference:String;
nameConstraint:any;
password:string;
username:string;
valueCO2:any;
dateCO2:any;
buttonOptions: any = {
  icon:"plus",
  text: "Add",
  type: "success",
  useSubmitBehavior: true,

}
forms:any={};
 cons: ConstraintCo2[];
 msg = '';
constructor(private userService: UserServiceService,private adminService: AdminServiceService) {

}

ngOnInit(): void
{

  this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
      this.userService.getuserBySubUser(this.subuser.cin).subscribe(
        data => {
          this.user=data;
          this.cinu=this.user.cinu;
          sessionStorage.setItem('user', JSON.stringify(this.user));
          console.log(this.cinu,"aaaaaaa")
        },

        err => console.log(err));
 this.readData();




this.listSp();
this.listConst();




this.webSocketAPI2._disconnect();
}



readData() {
  this.userService.listDevicesPerUser(this.subuser.cin).subscribe(
    data => {

      this.dataSource = data;



for (let i=0;i<this.dataSource.length;i++)
{
  this.valueCO2="";
  this.dateCO2="";

  this.userService.getDeviceRT_LastValue(this.dataSource[i].reference).subscribe(
    data=>{this.realtime=data;

      console.log("realtime "+this.realtime[0])

this.valueCO2=this.realtime["value_co2"];
this.dateCO2=this.realtime["date"];

console.log("dattttt"+this.dateCO2)



this.l={


  "valueco2":this.valueCO2,
  "dateco2":this.dateCO2
}
      },
    err=>{console.log(err.error.message)}
  )



  this.userService.getConstraint(this.dataSource[i].idConstraint).subscribe(
    data=>{

          this.constraint=data;
            this.nameC=this.constraint.nameConstraint;
            this.nameC!=null;
            this.nameC!=undefined;
            this.minv=this.constraint.min_value;
            this.maxv=this.constraint.max_value;

      },
    err=>{console.log(err.error.message)}
  )
  this.userService.getSpace(this.dataSource[i].idSpace).subscribe(
    data=>{this.space=data;
      this.namex=this.space.name;
      this.lat=this.space.latitude;
      this.long=this.space.longitude;

      this.l={

        "name":this.namex,
        "nameConstraint":this.nameC,
        "long":this.long,
        "lat":this.lat,
        "minValue":this.minv,
        "maxValue":this.maxv,
        "valueco2":this.valueCO2,
        "dateco2":this.dateCO2
      }

 this.tab.push(this.l)

    this.namex="";
    this.nameC="";
    this.lat="";
    this.long="";

    this.valueCO2="-------";
    this.dateCO2="------";
    console.log(this.tab)


      },
    err=>{console.log(err.error.message)}
  )







}

      console.log(data);
      console.log("tab"+this.tab)
    },

    err=> {
      console.log(err.error.message);});








    }



      listConst() {
        this.adminService.listConstraints().subscribe(
          data => {

            this.cons = data;

            console.log(this.cons);


          },

          err=> {
            console.log("no consss");

          })
            }






          listSp()
           {
             this.adminService.listSpaces().subscribe(
               data=> {
                 this.spaces=data;
                 console.log(data);
                      },
                      err=>{
                        console.log(err.error.message);
                          }
                    )
                  }



                  showInfo(device) {
                    this.device = device;
                this.popupVisible=true;

                  this.userService.getSpace(this.device.idSpace).subscribe(
                    data=>{this.space=data;
                            this.nameS=this.space.name+"\n\nLongitude="+this.space.longitude+"\n\n Latitude="+this.space.latitude;

                      },
                    err=>{console.log(err.error.message)}
                  )

                  this.userService.getConstraint(this.device.idConstraint).subscribe(
                    data=>{this.constraint=data;
                            this.nameC=this.constraint.nameConstraint;
                            this.values=   "[ Min Value="+this.constraint.min_value+" °C , Max Value="+this.constraint.max_value+" °C ]";

                      },
                    err=>{console.log(err.error.message)}
                  )

                  this.userService.getDeviceRT_LastValue(this.device.reference).subscribe(
                    data=>{this.realtime=data;

                      if (this.realtime !=undefined)

                   {   console.log("realtime "+this.realtime[0])

                   this.vc2=this.realtime["value_co2"];
                   this.dc2=this.realtime["date"];}
                   else {



                    this.vc2="---------";
                    this.dc2="----------";
                   }





                      },
                    err=>{console.log(err.error.message)}
                  )




                }

}
