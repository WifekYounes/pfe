import { Component, OnInit, ViewChild } from '@angular/core';
import { Area } from 'src/app/models/area';
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
  selector: 'app-clientareas',
  templateUrl: './clientareas.component.html',
  styleUrls: ['./clientareas.component.css']
})
export class ClientareasComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSource = [];
  listca =[];
  msg = '';
  cinu:number;
  idArea:number;
  form:any={};
  users: User[] = [];
  areas:Area[] = [];
  //clients: string[];

  ngOnInit(): void {
    this.listUsers();
    this.listAreas();
    this.listUsersAreas();
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

    listUsersAreas()
    {
      this.adminService.listUserAreas().subscribe(
        data => {

          this.listca = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }

    removeClientArea(event){

      this.adminService.deleteUserAreas(event.data.ua_key.cinu,event.data.ua_key.idArea).subscribe(
        data=>{this.msg=data;
          console.log(event.data)
          this.listUsersAreas()
          notify("Area Removed successfully from User", "success", 1500);
        }

       ,
        err=>{
          notify(err.error.message, "warning", 1500);

        }
      )
    }

    listAreas() {
      this.adminService.listAreas().subscribe(
        data => {

          this.areas = data;

          console.log(data);
        },

        err=> {
          console.log(err);});}


save(){
  let  d:Date=new Date();
  this.form={
    "ua_key":{
      "cinu":this.cinu,
      "idArea":this.idArea
    },
    "dateAff":d
  };
  this.adminService.affectUserArea(this.form).subscribe(

    data=>{
      console.log(data);
      notify("Area assigned successfullt to the user ", "success", 1500);
      this.listUsersAreas();
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
      doc.save('clientAreas.pdf');
  })
}

onExporting(e) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('clientAreas');

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
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "clientAreas.xlsx");
    });
  });
  e.cancel = true;
}

}
