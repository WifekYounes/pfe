import { Component, OnInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";

import { StockChart } from 'angular-highcharts';

import { WebSocketAPI } from 'src/app/WebSocketAPI';

import { SubuserserviceService } from 'src/app/services/subuserservice.service'
import notify from 'devextreme/ui/notify';
import { Device } from 'src/app/models/device';
import { WebSocketAPI3 } from 'src/app/WebSocketAPI3';
@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {

  webSocketAPI3: WebSocketAPI3;
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



  constructor(private subuserService: SubuserserviceService) { }
  ngOnInit() {
    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));



    this.webSocketAPI3 = new WebSocketAPI3();

      this.webSocketAPI3.i=this.subuser.cin;
      this.listDevices();
      this.webSocketAPI3.r=this.reference;
      this.webSocketAPI3._connect();

    this.getChart(this.subuserService,  this.webSocketAPI3.r);

    this.valuesRT();

  }

getChart(ad:SubuserserviceService,ch:any){


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

  this.subuserService.getRTValues(this.reference).subscribe(
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
    this.subuserService.listDevices(this.subuser.cin).subscribe(
      data => {

        this.devices = data;

        console.log(data);
      },

      err=> {
        console.log(err);});}



xx(){
  this.webSocketAPI3.r=this.reference;
  this.webSocketAPI3._send();
  this.OK=false;
this.getChart(this.subuserService, this.webSocketAPI3.r)


}





}

