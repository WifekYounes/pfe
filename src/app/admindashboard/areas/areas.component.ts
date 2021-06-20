import { Component,AfterViewInit,OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import * as L from 'Leaflet';
import 'leaflet-draw';
import notify from 'devextreme/ui/notify';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css'],

})
export class AreasComponent implements  AfterViewInit,OnInit {
name
  map;
  on;
  test=false;
  xx=false;
  idArea:any;
  f:number;
//  popupSpace:boolean=this.adminService.popup;
spaces=[];
areas=[];
   gbeli = [
    { lat: 33.97980872872457,
    lng: 9.42626953125},
    {    lat: 33.08233672856376,
      lng: 10.415039062500002},
      {    lat: 32.75032260780972,
        lng: 10.3358789},
        {    lat:   33.52307880890422,
          lng: 8.349609375000002},

  ];

   res;
   smallIcon = new L.Icon({
    iconUrl: '../../../assets/my.png',
      iconRetinaUrl: '../../../assets/my.png',
      iconSize:    [25, 41],
      iconAnchor:  [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: '../../../assets/marker-shadow.png',
      shadowSize:  [41, 41]
  });
  msg = '';
  options:any={};

  constructor(public adminService: AdminServiceService) { }

  ngOnInit(): void {

    this.listSpaces();
    this.listAreas();





  }
  ngAfterViewInit(): void {

    this.createMap(this.adminService);


//this.test=this.xx;

  }





createMap(ad:AdminServiceService){

  const tunisie = {
    lat: 33.892166,
    lng: 9.561555499999997,
  };








  const zoomlevel = 6;
this.map = L.map('map', {drawControl: true}).setView([ 33.892166, 9.561555499999997], 5);
const mainlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 7,
  maxZoom: 17,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
});


const drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);
    mainlayer.addTo(this.map);





this.map.on('draw:created', function (e) {


  var type = e.layerType,
      layer = e.layer;

  drawnItems.addLayer(layer);

  var shapes = []; let tab:any;   var bb=[];

  drawnItems.eachLayer(function(layer) {
      if (layer instanceof L.Polygon) {
      /*    shapes.push(layer.getLatLngs())
          var shape = layer.toGeoJSON()
          //
          var shape_for_db = JSON.stringify(shape);

           tab=layer.getLatLngs()[0];
          for(var i=0;i<tab.length;i++)
                {
                  console.log("LAT==>"+ tab[i]["lat"]);
                  console.log("LONG==>"+ tab[i]["lng"]);


     bb.push("["+[layer.getLatLngs()[0][i]["lat"],layer.getLatLngs()[0][i]["lng"]+"]"]);

                }

             console.log("length "+tab.length)*/
              var p=JSON.stringify(layer.toGeoJSON());
              setTimeout(() => {    ad.popuparea=true;
                ad.geojson=p;}, 1000);


          /*    let name = prompt("Please specify the area name :", "");
              ad.addArea(
                { "name":name,
                "geojson":p}).subscribe(
                   data=>{
                      console.log(data);
                      notify("Area added successfully ", "success", 1500);
                      window.location.reload()
                },
                  err=>{
                      console.log(err.error.message);
                      notify(err.error.message, "warning", 1500);
                  }
                )
                layer.bindPopup('<b>'+name+'</b>'); */}

                if (layer instanceof L.Circle) {
          shapes.push([layer.getLatLng()])

          alert("cercle "+layer.getLatLng());
          console.log(layer.getLatLng()["lat"])
          console.log(layer.getLatLng()["lng"])

      }

      else if (layer instanceof L.Marker) {
          shapes.push([layer.getLatLng()]);

          var lat = layer.getLatLng().lat;
          var lng = layer.getLatLng().lng;

          ad.lat=lat;
          ad.lng=lng;

       //  let name = prompt("Please specify the space name :", "");
         ad.popupspace=true;

         //console.log("popup"+ ad.popupspace)
       //  alert("popup yelzm temchi"+ ad.popupspace)

          /*ad.addSpace(
            { "name":name,
            "longitude":lng,
            "latitude":lat
             }
             ).subscribe(data=>{
               console.log(data);
               notify("Space added successfully ", "success", 1500);
                 window.location.reload()              },
                err=>{
               console.log(err.error.message);
               notify(err.error.message, "warning", 1500);
           }
            )
         layer.bindPopup('<b>'+name+'</b>');
          console.log(layer.getLatLng())*/

      }})

      ;})




  }




addMarker(coords){
  const marker =L.marker([coords.lat, coords.lng],{icon: this.smallIcon});
  marker.addTo(this.map);}

listSpaces(){
  this.adminService.listSpaces().subscribe(
    data=> {
      this.spaces=data;
      console.log(data);
     for(let i=0;i<this.spaces.length;i++)
      {
       console.log("Longitude ==>",this.spaces[i]["longitude"])
       console.log("latitude ==>",this.spaces[i]["latitude"])
       const marker =L.marker([this.spaces[i]["latitude"], this.spaces[i]["longitude"]],{icon: this.smallIcon});
       marker.addTo(this.map) .bindPopup('<b>'+this.spaces[i]["name"]+'</b>');
      }
    },
    err=>{
      console.log(err.error.message);
         })
}

addS(){
this.adminService.addSpace(
  { "name":this.name,
  "longitude":this.adminService.lng,
  "latitude":this.adminService.lat,
  "idArea":this.idArea
   }
   ).subscribe(data=>{
     console.log(data);
     this.listSpaces();
     const marker =L.marker([this.adminService.lat, this.adminService.lng],{icon: this.smallIcon});
     marker.addTo(this.map) .bindPopup('<b>'+this.name+'</b>');

     notify("Space added successfully ", "success", 2500);



      this.adminService.popupspace=false
      this.adminService.lat=0;
        this.adminService.lng=0;
        window.location.reload()   },
      err=>{
     console.log(err.error.message);
     notify(err.error.message, "warning", 1500);
 }
  )

}


addA(){
  this.adminService.addArea(
    { "name":this.name,
    "geojson":this.adminService.geojson,

     }
     ).subscribe(data=>{
       console.log(data);


       notify("Area added successfully ", "success", 2500);

       window.location.reload()

        this.adminService.popuparea=false
        this.adminService.geojson='';


          this.listAreas();
        },
        err=>{
       console.log(err.error.message);
       notify(err.error.message, "warning", 1500);
   }
    )

  }

listAreas(){

  this.adminService.listAreas().subscribe(
    data=>  {
      this.areas=data;
      console.log(data);
     for(let i=0;i<this.areas.length;i++)
      {
       console.log("GeoJson ==>",this.areas[i]["geojson"])
       let a = JSON.parse(this.areas[i]["geojson"]);
       console.log("aa"+a);
        const geojson = new L.GeoJSON(a).addTo(this.map).bindPopup('<b>'+this.areas[i]["name"]+'</b>');
      }
           },
    err=>{
      console.log(err.error.message);
        }
  )
}

}















