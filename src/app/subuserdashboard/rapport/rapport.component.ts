import { Component, OnInit, ViewChild } from '@angular/core';
import { SubuserserviceService } from 'src/app/services/subuserservice.service'
import notify from 'devextreme/ui/notify';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { Observable, timer } from 'rxjs'
import {  DxDataGridComponent } from 'devextreme-angular';
import 'jspdf-autotable';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import saveAs from 'file-saver';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  @ViewChild('aaa', { static: false }) aaa: DxDataGridComponent;
  @ViewChild('aaad', { static: false }) aaad: DxDataGridComponent;
  @ViewChild('hhh', { static: false }) hhh: DxDataGridComponent;
  @ViewChild('hhhaaa', { static: false }) hhhaaa: DxDataGridComponent;

  form:any={};
test:Boolean;
  l:any=0;
name:any;
alert:Boolean=false;
history:Boolean=false;
type:any;
reference:String;
module:any;
user:any;
date:any;
subuser:any;
alertsRef:any=[];
alertsDate:any=[];
historyAlertRef:any=[];
historyRef:any=[];
devices:any=[];
  choices= [
            {ID:1, module:"Alert"},
            {ID:2,module:"History"}
          ];

    formats= [
           {ID:1, type:"PDF"},
           {ID:2,type:"EXCEL"}
          ];

  file:any=["PDF","EXCEL"];


  constructor(private subuserService: SubuserserviceService,public datepipe: DatePipe) { }
  ngOnInit() {
    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));

    //  this.save();

    this.listDevices();

 }


  listDevices() {
    this.subuserService.listDevices(this.subuser.cin).subscribe(
      data => {

        this.devices = data;

        console.log(data);
      },

      err=> {
        console.log(err);});}





        onExporting1() {
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('alertsRef');

          worksheet.columns = [
            { width: 5 }, { width: 30 }, { width: 25 }, { width: 15 }, { width: 25 }, { width: 40 }
          ];

          exportDataGrid({
            component: this.aaa.instance,
            worksheet: worksheet,
            keepColumnWidths: false,
            topLeftCell: { row: 2, column: 2 },
            customizeCell: ({ gridCell, excelCell }) => {
              if(gridCell.rowType === "data") {


              }

            }
          }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "alertsRef.xlsx");
            });
          });

        }




        onExporting2() {
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('HistoryRef');

          worksheet.columns = [
            { width: 5 }, { width: 30 }, { width: 25 }, { width: 15 }, { width: 25 }, { width: 40 }
          ];

          exportDataGrid({
            component: this.hhh.instance,
            worksheet: worksheet,
            keepColumnWidths: false,
            topLeftCell: { row: 2, column: 2 },
            customizeCell: ({ gridCell, excelCell }) => {
              if(gridCell.rowType === "data") {


              }

            }
          }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "HistoryRef.xlsx");
            });
          });

        }




        onExporting3() {
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('HistoryAlertRef');

          worksheet.columns = [
            { width: 5 }, { width: 30 }, { width: 25 }, { width: 15 }, { width: 25 }, { width: 40 }
          ];

          exportDataGrid({
            component: this.hhhaaa.instance,
            worksheet: worksheet,
            keepColumnWidths: false,
            topLeftCell: { row: 2, column: 2 },
            customizeCell: ({ gridCell, excelCell }) => {
              if(gridCell.rowType === "data") {


              }

            }
          }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
              saveAs(new Blob([buffer], { type: "application/octet-stream" }), "HistoryAlertRef.xlsx");
            });
          });

        }


        exportGrid1() {
          const doc = new jsPDF();
          exportDataGridToPdf({
              jsPDFDocument: doc,
              component: this.aaa.instance
          }).then(() => {
              doc.save('alertsByRef.pdf');
          })
        }

        exportGrid3() {
          const doc = new jsPDF();
          exportDataGridToPdf({
              jsPDFDocument: doc,
              component: this.hhhaaa.instance
          }).then(() => {
              doc.save('alerts&HistoryByRef.pdf');
          })
        }

        exportGrid4() {
          const doc = new jsPDF();
          exportDataGridToPdf({
              jsPDFDocument: doc,
              component: this.aaad.instance
          }).then(() => {
              doc.save('alerts&HistoryByRef.pdf');
          })
        }

        exportGrid2() {
          const doc = new jsPDF();
          exportDataGridToPdf({
              jsPDFDocument: doc,
              component: this.hhh.instance
          }).then(() => {
              doc.save('historyByRef.pdf');
          })
        }

  save()
  {


  {

    if (this.module=='Alert')
          {
            //Methode Alert By Ref

              if (this.type=='PDF')
                      {
                        this.subuserService.reportAlertRef(this.subuser.cin,this.reference).subscribe(
                          data => {

                            this.alertsRef = data;
                            this.l++;
                            console.log(data);
                            notify("Alert Data exported successfully", "success", 1500);;


                          },

                          err=> {
                            console.log(err);
                                });

                                setTimeout(() => {this.exportGrid1();}, 1500);
                      }
              if(this.type=='EXCEL')
                      {
                        this.subuserService.reportAlertRef(this.subuser.cin,this.reference).subscribe(
                          data => {

                            this.alertsRef = data;
                            this.l++;
                            console.log(data);
                            notify("Alert Data exported successfully", "success", 1500);;


                          },

                          err=> {
                            console.log(err);
                                });

                                setTimeout(() =>
                                { this.onExporting1();

                                }

                                , 1500);
                      }
          }

    if (this.module=='History')
          {
            //Methode History By Ref
            if (this.type=='PDF')
                      {
                        this.subuserService.reportHistorytRef(this.subuser.cin,this.reference).subscribe(
                          data => {

                            this.historyRef = data;
                            this.l++;
                            console.log(data);
                            notify("History Data exported successfully", "success", 1500);;


                          },

                          err=> {
                            console.log(err);
                                });

                                setTimeout(() => {this.exportGrid2();}, 1500);
                      }
           if(this.type=='EXCEL')
                      {
                        this.subuserService.reportHistorytRef(this.subuser.cin,this.reference).subscribe(
                          data => {

                            this.historyRef = data;
                            this.l++;
                            console.log(data);
                            notify("History Data exported successfully", "success", 1500);;


                          },

                          err=> {
                            console.log(err);
                                });

                                setTimeout(() => {this.onExporting2();}, 1500);
                      }
          }

 /*   if ((this.alert==true) && (this.history==true))
          { //alert(this.reference)
            //MethodeAlert & History By Ref
            if (this.type=='PDF')
                      {
                        this.subuserService.reportHistoryAlertRef(this.subuser.cin,this.reference).subscribe(
                          data => {

                            this.historyAlertRef = data;
                            this.l++;
                            console.log(data);
                            notify("Alert & History Data exported successfully", "success", 1500);;

                            setTimeout(() => {this.exportGrid3();}, 1500);

                          },

                          err=> {
                            console.log(err);
                                });


                      }
            if(this.type=='EXCEL')
                      {
                        this.subuserService.reportHistoryAlertRef(this.subuser.cin,this.reference).subscribe(
                          data => {

                            this.historyAlertRef = data;
                            this.l++;
                            console.log(data);
                            notify("Alert & History Data exported successfully", "success", 1500);;


                          },

                          err=> {
                            console.log(err);
                                });

                                setTimeout(() => {this.onExporting3();}, 1500);
                      }
          }*/


        }





  }



}
