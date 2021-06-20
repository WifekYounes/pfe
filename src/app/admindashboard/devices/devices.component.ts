import { Component, OnInit,OnChanges, ViewChild } from '@angular/core';
import { Device } from 'src/app/models/device';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import notify from 'devextreme/ui/notify';
import { Space } from 'src/app/models/space';
import { ConstraintCo2 } from 'src/app/models/constraint-co2';
import { RtCo2 } from 'src/app/models/rt-co2';
import {DxFormComponent } from 'devextreme-angular';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit{
//  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent
device:any;
//img: any[] = [];
dev:any={}; long:any;lat:any;
currentDevice: any;
popupVisible = false;
popupUpdate = false;
name:String;
values:any;
minv:any;
maxv:any;
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
vc2:any;
dc2:any
nameC:any;
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
constructor(private adminService: AdminServiceService) {

}

ngOnInit(): void
{
  this.readData();




this.listSp();
this.listConst();}



readData() {
  this.adminService.listdevices().subscribe(
    data => {

      this.dataSource = data;



for (let i=0;i<this.dataSource.length;i++)
{
  this.valueCO2="";
  this.dateCO2="";

  this.adminService.getDeviceRT_LastValue(this.dataSource[i].reference).subscribe(
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



  this.adminService.getConstraint(this.dataSource[i].idConstraint).subscribe(
    data=>{this.constraint=data;
            this.nameC=this.constraint.nameConstraint;
            this.minv=this.constraint.min_value+" °C";
            this.maxv=this.constraint.max_value+" °C";

      },
    err=>{console.log(err.error.message)}
  )
  this.adminService.getSpace(this.dataSource[i].idSpace).subscribe(
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



      },
    err=>{console.log(err.error.message)}
  )





  this.namex="";
  this.nameC="";
  this.lat="";
  this.long="";

  this.valueCO2="-------";
  this.dateCO2="------";
  console.log(this.tab)


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

  this.adminService.getSpace(this.device.idSpace).subscribe(
    data=>{this.space=data;
            this.nameS=this.space.name+"\n\nLongitude="+this.space.longitude+"\n\n Latitude="+this.space.latitude;

      },
    err=>{console.log(err.error.message)}
  )

  this.adminService.getConstraint(this.device.idConstraint).subscribe(
    data=>{this.constraint=data;
            this.nameC=this.constraint.nameConstraint;
            this.values=   "[ Min Value="+this.constraint.min_value+" °C , Max Value="+this.constraint.max_value+" °C ]";

      },
    err=>{console.log(err.error.message)}
  )

  this.adminService.getDeviceRT_LastValue(this.device.reference).subscribe(
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


deleteDevice(device){
  this.device = device;
this.popupDelete = true;

}

updateDevice(device){
  this.device = device;
this.popupUpdate = true;

}


save(device){

  this.device=device;

  this.dev={
    "reference":this.device.reference,
    "name":this.device.name,
   // "imageurl": "../../../assets/"+this.img[0]["name"],
   "idSpace":this.device.idSpace,
    "idConstraint":this.device.idConstraint
  }
  this.adminService.updateDevice(this.device.reference,this.dev).subscribe(
    data=>{

      notify("Device updated successfully", "success", 1500);
      this.popupUpdate = false;
      window.location.reload()
    },
    err=>{
      notify(err.error.message, "warning", 1500);

    }
  )
  console.log(this.device)}


  delete(device){
    this.device=device;
    this.adminService.deleteDevice(this.device.reference).subscribe(
      data=>{this.msg=data;


                            this.popupDelete = false;

                            notify("Device deleted successfully", "success", 1500);
                            this.adminService.listdevices().subscribe(
                              data => {

                                this.dataSource = data;

                                console.log(data);
                              },

                              err=> {
                                console.log(err.error.message);});
                                window.location.reload()

                          }

                         ,
                          err=>{
                            notify(err.error.message, "warning", 1500);

                          }
                        )

  }



  addDev(device){
    this.device = device;
  this.popupAdd = true;

  }

  add(){


    this.dev={
      "reference":this.reference,
      "name":this.name,
      //"imageurl": "../../../assets/"+this.img[0]["name"],
     "idSpace":this.idSpace,
     "idConstraint":this.idConstraint
    }

    if (this.dev.name==null){  notify("Error in name !", "warning", 1500);}


else {
this.adminService.addDevice(this.dev).subscribe(
      data=>{console.log(data);
        notify("Device added successfully", "success", 1500);


       window.location.reload()
        this.popupAdd = false;

        this.adminService.listdevices().subscribe(
          data => {

            this.dataSource = data;

            console.log(data);
          },

          err=> {
            console.log(err.error.message);

          });
      },
        err=>{
        notify(err.error.message, "warning", 1500);
        notify(err.error, "warning", 1500);
       //  alert(err)

      }
    )

    }

  }

s(){ notify("ok", "success", 1500);}

}
