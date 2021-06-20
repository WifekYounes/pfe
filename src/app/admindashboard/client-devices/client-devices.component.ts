import { Component, OnInit,ViewChild } from '@angular/core';
import { Device } from 'src/app/models/device';
import { User } from 'src/app/models/user';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import ArrayStore from "devextreme/data/array_store";
import notify from 'devextreme/ui/notify';
import {  DxDataGridComponent } from 'devextreme-angular';

import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import saveAs from 'file-saver';
@Component({
  selector: 'app-client-devices',
  templateUrl: './client-devices.component.html',
  styleUrls: ['./client-devices.component.css']
})
export class ClientDevicesComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSource = [];
  listud =[];
  admin:any;
  subuser:any;
  msg = '';
  cinu:number;
  cin_admin:number;
  reference:String;
  form:any={};
  users: User[] = [];
  devices:any = [];
  //clients: string[];

  ngOnInit(): void {

    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.adminService.getAdmin(this.subuser.cin).subscribe(
      data => {
        this.admin=data;
        this.cin_admin=this.admin.cin_admin;
        console.log("cinADMIN"+this.cin_admin)
        sessionStorage.setItem('admin', JSON.stringify(this.admin));

      },

      err => console.log(err.error.message));

    this.listUsers();
    this.listDevices();
    this.listUsersDevice();
  }

  constructor(private adminService: AdminServiceService) {

    }


    listUsers()
    {
      this.adminService.listUsers().subscribe(
        data => {

          this.users = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }

    listUsersDevice()
    {
      this.adminService.listUserDevices().subscribe(
        data => {

          this.listud = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }

    removeUserDevice(event){

      this.adminService.deleteUserDevices(event.data.udk.cinu,event.data.udk.reference).subscribe(
        data=>{this.msg=data;
          console.log(event.data)
          this.listUsersDevice();
          notify("Device Removed successfully from User", "success", 1500);
        }

       ,
        err=>{
          notify(err.error.message, "warning", 1500);

        }
      )
    }

    listDevices() {
      this.adminService.listdevicesNull().subscribe(
        data => {

          this.devices = data;

          console.log(data);
        },

        err=> {
          console.log(err);});}


save(){
let  d:Date=new Date();
  this.form={
    "udk":{
      "cinu":this.cinu,
      "reference":this.reference
    },
    "cin_admin":this.cin_admin,
    "dateAff":d
  };
  this.adminService.affectUserDevice(this.form).subscribe(

    data=>{
      console.log(data);
      notify("Device assigned successfully to the user ", "success", 1500);
      this.listUsersDevice();
    },
    err=>{

      notify(err.error.message, "warning", 1500);
    }
  )

}


exportGrid() {
  const doc = new jsPDF();
  exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
  }).then(() => {
      doc.save('usersDevices.pdf');
  })
}

onExporting(e) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('usersDevices');

  worksheet.columns = [
    { width: 5 }, { width: 30 }, { width: 25 }, { width: 15 }, { width: 25 }, { width: 40 }
  ];

  exportDataGrid({
    component: e.component,
    worksheet: worksheet,
    keepColumnWidths: false,
    topLeftCell: { row: 2, column: 2 },
    customizeCell: ({ gridCell, excelCell }) => {
      if(gridCell.rowType === "data") {
        if(gridCell.column.dataField === 'tel') {
          excelCell.font = { color: { argb: 'FF0000FF' }, underline: true };
          excelCell.alignment = { horizontal: 'left' };
        }

      }

    }
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "usersDevices.xlsx");
    });
  });
  e.cancel = true;
}

}
