  import { Component, OnInit, ViewChild } from '@angular/core';
  import { User } from '../../models/user';
  import { UserServiceService } from '../../services/user-service.service';
  import notify from 'devextreme/ui/notify';
import { SubUser } from 'src/app/models/sub-user';
import {  DxDataGridComponent } from 'devextreme-angular';

import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import saveAs from 'file-saver';
  @Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    preserveWhitespaces: true,
  })
  export class EmployeesComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

    cinu:number;
    dataSource = [];
    msg = '';
    signup:any={};
    rol=[{ID:1,
          name:"read"},
            {ID:2,
          name:"write"}];
    user:any;
    subuser:any;
    constructor(private userService: UserServiceService) {}

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
this.list();


    }

  list(){
    this.userService.listSubUserByUser(this.subuser.cin).subscribe(
      data => {
        this.dataSource=data;


        console.log(data)
      },

      err => console.log(err));

}


deleteSub(event) {

  this.userService.deleteSubUser(event.data.cin).subscribe(
    data=>{this.msg=data;
      console.log(event.data)
      this.list();
      notify("SubUser deleted successfully", "success", 1500);
    }

   ,
    err=>{
      notify(err.error.message, "warning", 1500);

    }
  )
}



insertSub(event) {

  let rolee:String[]=[];
  rolee[0]=event.data.role;

  this.signup={
    "cin":event.data.cin,
    "username": event.data.username,
    "password": event.data.password,
    "email":event.data.email,
    "dateBirth":event.data.dateBirth,
    "name":event.data.name,
    "surname":event.data.surname,
    "tel":event.data.tel,
    "role":rolee,
    "cinu":this.subuser.cin
  };

  this.userService.addSubUser(this.subuser.cin,this.signup).subscribe(
    data=>{console.log(data);
      notify("SubUser added successfully", "success", 1500);
      this.list();},
      err=>{
      notify(err.error.message, "warning", 1500);
      this.list();
      console.log(err.error.message)
    }
  )
}




updateSub(event) {

  let rolee:String[]=[];
  rolee[0]=event.data.role;

  this.signup={

    "role":rolee

  };

  this.userService.updateSubUser(this.subuser.cin,event.data.cin,this.signup).subscribe(
    data=>{console.log(data);
      notify("Role updated successfully", "success", 1500);
      this.list();},
      err=>{
      notify(err.error.message, "warning", 1500);
      this.list();
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
      doc.save('employees.pdf');
  })
}

onExporting(e) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('employees');

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
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "employees.xlsx");
    });
  });
  e.cancel = true;
}
}
