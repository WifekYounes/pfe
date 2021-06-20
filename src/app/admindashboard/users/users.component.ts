import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { AdminServiceService } from '../../services/admin-service.service';
import notify from 'devextreme/ui/notify';
import {  DxDataGridComponent } from 'devextreme-angular';

import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import saveAs from 'file-saver';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  cin: Number;
  dataSource: User[] = [];
  msg = '';
  cin_admin:number;
  admin:any;
  subuser:any;
  signup:any={};

  constructor(private adminService: AdminServiceService) {}

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
    this.readData();
  }

  readData() {
    this.adminService.listUsers().subscribe(
      data => {

        this.dataSource = data;

        console.log(data);
      },

      err=> {
        console.log(err);

      }
    );
  }



  deleteData(event) {

    this.adminService.deleteUser(event.data.cin).subscribe(
      data=>{this.msg=data;
        console.log(event.data)
        this.readData();
        notify("User deleted successfully", "success", 1500);
      }

     ,
      err=>{
        notify(err.error.message, "warning", 1500);

      }
    )
  }



  insertData(event) {
    this.signup={
      "cin":event.data.cin,
      "username": event.data.subuser.username,
      "password": event.data.subuser.password,
      "email":event.data.subuser.email,
      "dateBirth":event.data.subuser.dateBirth,
      "name":event.data.subuser.name,
      "surname":event.data.subuser.surname,
      "tel":event.data.subuser.tel,
      "cin_admin":this.cin_admin
    };

    this.adminService.addUser(this.signup).subscribe(
      data=>{console.log(data);
        notify("User added successfully", "success", 1500);
        this.readData();},
        err=>{
        notify(err.error.message, "warning", 1500);
        this.readData();
        console.log(err.error.message)
      }
    )
  }


  exportGrid() {
    const doc = new jsPDF();
    exportDataGridToPdf({
        jsPDFDocument: doc,
        component: this.dataGrid.instance
    }).then(() => {
        doc.save('users.pdf');
    })
  }

  onExporting(e) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('users');

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
          if(gridCell.column.dataField === 'email') {
            excelCell.font = { color: { argb: 'FF0000FF' }, underline: true };
            excelCell.alignment = { horizontal: 'left' };
          }

        }

      }
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "users.xlsx");
      });
    });
    e.cancel = true;
  }

}
