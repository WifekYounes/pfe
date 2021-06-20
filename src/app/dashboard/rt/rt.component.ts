import { Component, OnInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";

import { StockChart } from 'angular-highcharts';

import { WebSocketAPI2 } from 'src/app/WebSocketAPI2';

import { UserServiceService } from '../../services/user-service.service';
import notify from 'devextreme/ui/notify';
import { Device } from 'src/app/models/device';
@Component({
  selector: 'app-rt',
  templateUrl: './rt.component.html',
  styleUrls: ['./rt.component.css']
})
export class RtComponent implements OnInit {


  webSocketAPI2: WebSocketAPI2;
  greeting: any;
  name: string;
  x:any;

  user:any;
  L:number;
  subuser:any;
  stock: StockChart;
v:any;
listValues:any=[];
devices:Device[] = [];
reference:String;
 OK=true;
Highcharts: typeof Highcharts = Highcharts;



  constructor(private userService: UserServiceService) { }
  ngOnInit() {
    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.userService.getuserBySubUser(this.subuser.cin).subscribe(
      data => {
        this.user=data;

        console.log("cinUSER"+this.subuser.cin)
        sessionStorage.setItem('user', JSON.stringify(this.user));
      },err=>{console.log(err.error.message)})


    this.webSocketAPI2 = new WebSocketAPI2();

      this.webSocketAPI2.i=11110000;
      this.listDevices();
      this.webSocketAPI2.r=this.reference;
      this.webSocketAPI2._connect();

    this.getChart(this.userService,  this.webSocketAPI2.r);

    this.valuesRT();

  }

getChart(us:UserServiceService,ch:any){


console.log("🚀 ~ file:ch", ch)


  this.stock = new StockChart({

    chart: {
      events: {
          load: function () {

            let tab:any=[];
              var series = this.series[0];
              setInterval(function () {
                  var x =(new Date()).getTime(); // current time
               us.getRTValues(ch).subscribe(
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
            tab=us.getRTValues(ch);
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

  this.userService.getRTValues(this.reference).subscribe(
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
    this.userService.listDevicesPerUser(this.subuser.cin).subscribe(
      data => {

        this.devices = data;

        console.log(data);
      },

      err=> {
        console.log(err);});}



xx(){
  this.webSocketAPI2.r=this.reference;
  this.webSocketAPI2._send();
  this.OK=false;
this.getChart(this.userService, this.webSocketAPI2.r)


}



handleMessage(){

  console.log (this.greeting)
}

}

