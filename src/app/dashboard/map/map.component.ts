import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'Leaflet';
import { Device } from 'src/app/models/device';
import { Space } from 'src/app/models/space';
import { Map } from 'src/app/models/map';
import { UserServiceService } from '../../services/user-service.service';

import ArrayStore from "devextreme/data/array_store";
import notify from 'devextreme/ui/notify';
import { SubUser } from 'src/app/models/sub-user';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements  AfterViewInit,OnInit{
map;
i:number;
dataSource = [];
listud =[];
msg = '';
y:number;
fares:any={};
x:number;
cinu:number;
cin:number;
idSpace:Number;
user:any;
subuser:any;
ar=[];

reference:String;
form:any={};
subusers: SubUser[] = [];
spaces=[];
maps: Map[] = [];
smallIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
});
  constructor(private userService: UserServiceService) { }



  ngOnInit(): void {

    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.userService.getuserBySubUser(this.subuser.cin).subscribe(
      data => {
        this.user=data;
        this.cinu=this.user.cinu;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        console.log(this.cinu,"aaaaaaa")
      },

      err => console.log(err));
      this.listSpaces();
      this.listAreas();


  }
  ngAfterViewInit(): void {
    this.createMap();

    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.userService.getuserBySubUser(this.subuser.cin).subscribe(
      data => {
        this.user=data;
        this.cinu=this.user.cinu;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        console.log(this.cinu,"aaaaaaa")
      },

      err => console.log(err));
    this.listSpaces();
    this.listAreas();

  }
  listSpaces(){


      this.userService.listUserSpacesperDevice(this.subuser.cin).subscribe(
        data=> {
          this.spaces=data;
          console.log(data);
          for(let i=0;i<this.spaces.length;i++)
          {
           console.log("Longitude ==>",this.spaces[i][0])
           console.log("latitude ==>",this.spaces[i][1])


           const marker =L.marker([this.spaces[i][1], this.spaces[i][0]],{icon: this.smallIcon});
           marker.bindPopup('<b> latitude='+this.spaces[i][1]+ '<br>'+'Longitude='+ this.spaces[i][0]+'</b>').addTo(this.map);

          }
          console.log(this.maps);
        },
        err=>{
          console.log(err);
            }
      )


    }


    listAreas(){


      this.userService.listAreaperUser(this.subuser.cin).subscribe(
        data=>  {
          this.ar=data;
          console.log(data);
         for(let i=0;i<this.ar.length;i++)
          {
           console.log("GeoJson ==>",this.ar[i])
           let a = JSON.parse(this.ar[i]);
           console.log("aa"+a);
            const geojson = new L.GeoJSON(a).addTo(this.map).bindPopup('<b>'+this.ar[i]+'</b>');
          }
               },
        err=>{
          console.log(err.error.message);
            }
      )


    }

    createMap(){
      const tunisie = {
        lat: 33.892166,
        lng: 9.561555499999997,
      };

      for(let j=0;j<this.maps.length;j++)
      {
        const f = {
          lat: this.maps[j][0],
          lng:this.maps[j][1]
        };
        this.addMarker(f);

      }


      const zoomlevel = 6;
    this.map = L.map('map',{
      center:[tunisie.lat, tunisie.lng],
      zoom: zoomlevel
    });
    const mainlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 4,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    });


    mainlayer.addTo(this.map);






    }
    addMarker(coords){
      const marker =L.marker([coords.lat, coords.lng],{icon: this.smallIcon});
      marker.addTo(this.map);

    }

    }
