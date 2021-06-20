import { Component, OnInit, ViewChild } from '@angular/core';
import { Device } from 'src/app/models/device';
import { Space } from 'src/app/models/space';
import { UserServiceService } from '../../services/user-service.service';

import ArrayStore from "devextreme/data/array_store";
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
  selector: 'app-employspaces',
  templateUrl: './employspaces.component.html',
  styleUrls: ['./employspaces.component.css']
})
export class EmployspacesComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSource = [];
  listud =[];
  msg = '';
  cinu:number;
  cin:number;
  idSpace:Number;
  user:any;
  subuser:any;
  reference:String;
  form:any={};
  subusers: SubUser[] = [];
  spaces:Space[] = [];
  //clients: string[];

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



    this.listSubUsers();
    this.listSpaces();
    this.lisSubUserSpaces();
  }

  constructor(private userService: UserServiceService) {

    }


    listSubUsers()
    {
      this.userService.listSubUserByUser(this.subuser.cin).subscribe(
        data => {

          this.subusers = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }

    lisSubUserSpaces()
    {
      this.userService.newList(this.subuser.cin).subscribe(
        data => {

          this.listud = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }


    listSpaces(){


      this.userService.SCNDlistUserSpacesperDevice(this.subuser.cin).subscribe(
        data=> {
          this.spaces=data;
          console.log(data);

        },
        err=>{
          console.log(err);
            }
      )


    }


save(){
  let  d:Date=new Date();

  this.form={
    "sus_key":{
      "cin":this.cin,
      "idSpace":this.idSpace
    },
    "dateAff":d
  };
  this.userService.affectSubUserSpace(this.form).subscribe(

    data=>{
      console.log(data);
      notify("Device assigned successfullt to the user ", "success", 1500);
     this.lisSubUserSpaces();
    },
    err=>{

      notify(err.error.message, "warning", 1500);
    }
  )

}


removeSubUserSpace(event){

  this.userService.removeSubUserSpace(this.subuser.cin,event.data.sus_key.cin,event.data.sus_key.idSpace).subscribe(
    data=>{this.msg=data;
      console.log(event.data)

      notify("Space Removed successfully from SubUser", "success", 1500);
      this.lisSubUserSpaces();
    }

   ,
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
      doc.save('SubUser_Spaces.pdf');
  })
}

onExporting(e) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('SubUser_Spaces');

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
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "SubUser_Spaces.xlsx");
    });
  });
  e.cancel = true;
}

}
