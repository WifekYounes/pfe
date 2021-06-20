import { Component, OnInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";

import { StockChart } from 'angular-highcharts';

import { WebSocketAPI } from 'src/app/WebSocketAPI';

import { AdminServiceService } from '../../services/admin-service.service';
import notify from 'devextreme/ui/notify';
import { Device } from 'src/app/models/device';
@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {

  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  x:any;
  cin_admin:number;
  admin:any;
  L:number;
  subuser:any;
  stock: StockChart;
v:any;
listValues:any=[];
devices:Device[] = [];
reference:String;
 OK=true;
Highcharts: typeof Highcharts = Highcharts;



  constructor(private adminService: AdminServiceService) { }
  ngOnDestroy(){
    this.webSocketAPI._disconnect();
  }
  ngOnInit() {
    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.adminService.getAdmin(this.subuser.cin).subscribe(
      data => {
        this.admin=data;
        this.cin_admin=this.admin.cin_admin;
        console.log("cinADMIN"+this.cin_admin)
        sessionStorage.setItem('admin', JSON.stringify(this.admin));
      },err=>{console.log(err.error.message)})


    this.webSocketAPI = new WebSocketAPI();

      this.webSocketAPI.i=11110000;
      this.listDevices();
      this.webSocketAPI.r=this.reference;
      this.webSocketAPI._connect();

    this.getChart(this.adminService,  this.webSocketAPI.r);

    this.valuesRT();

  }

getChart(ad:AdminServiceService,ch:any){


console.log("🚀 ~ file:ch", ch)


  this.stock = new StockChart({

    chart: {
      events: {
          load: function () {

            let tab:any=[];
              var series = this.series[0];
              setInterval(function () {
                  var x =(new Date()).getTime(); // current time
                ad.getRTValues(ch).subscribe(
                  data=>{
                console.log("🚀 ~ file:ch", ch)
                    tab=data;

                    series.addPoint([x, tab[tab.length-1]], true, true);

                    console.log(data)
                  },err=>{console.log(err.error.message);}
                )


              }, 1000);
          }

      }
  },

  time: {
      useUTC: false
  },

  rangeSelector: {
      buttons: [{
          count: 1,
          type: 'minute',
          text: '1M'
      }, {
          count: 5,
          type: 'minute',
          text: '5M'
      }, {
          type: 'all',
          text: 'All'
      }],
      inputEnabled: false,
      selected: 0
  },

  title: {
      text: 'Live CO2 values'
  },

  exporting: {
      enabled: false
  },


  series: [  {
    type:undefined,
    name: 'CO2 Value',
    data: (function ()

    {

            var data = [],
            time = (new Date()).getTime(),i;
            let tab:any=[];
            tab=ad.getRTValues(ch);
            console.log("🚀 ~ file: realtime.component.ts ~ line 152 ~ RealtimeComponent ~ getChart ~ ch", ch)
              for (i = -999; i <= 0; i += 1)
                { //console.log(i)



                  data.push(  [ time + i*4 * 10000  ,  tab[i]  ] );
                }
              return data;
    }

    ()

    )

  }    ]

}


);

}

valuesRT(){

  this.adminService.getRTValues(this.reference).subscribe(
    data=>{
      this.listValues=data;
        this.v=this.listValues[0];

        this.L=this.listValues.length;
        console.log(this.v);

      console.log(data)
    },err=>{console.log(err.error.message);}
  )


  }



  listDevices() {
    this.adminService.listdevices().subscribe(
      data => {

        this.devices = data;

        console.log(data);
      },

      err=> {
        console.log(err);});}



xx(){
  this.webSocketAPI.r=this.reference;
  this.webSocketAPI._send();
  this.OK=false;
this.getChart(this.adminService, this.webSocketAPI.r)


}



handleMessage(){

  console.log (this.greeting)
}

}

