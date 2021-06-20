import { Component, OnInit, ViewChild } from '@angular/core';
import { Space } from 'src/app/models/space';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import notify from 'devextreme/ui/notify';
import { Area } from 'src/app/models/area';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import {  DxDataGridComponent } from 'devextreme-angular';
import 'jspdf-autotable';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import saveAs from 'file-saver';
@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  @ViewChild('aa', { static: false }) aa: DxDataGridComponent;

  dataSource: Space[] = [];
  areas: Area[] = [];
  xx: Area[] = [];

  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.listSp();
    this.listAr();
    this.listAre();

  }



  listAre()
  {
    this.adminService.listAreas().subscribe(
      data=> {
        this.areas=data;
        console.log(data);
      },
      err=>{
        console.log(err);
          }
    )
  }

  listAr()
  {
    this.adminService.listAreas().subscribe(
      data=> {
        this.xx=data;
        console.log(data);
      },
      err=>{
        console.log(err);
          }
    )
  }

addArea(event){
this.adminService.addArea(event.data).subscribe(
  data=>{
    console.log(data);
    notify("Area added successfully", "success", 1500);
    this.listAr();
  },
  err=>{
    notify(err.error.message, "warning", 1500);
    this.listAr();
    console.log(err.error.message)
  }

)
}

DeleteArea(event)
{
  this.adminService.deleteArea(event.data.idArea).subscribe(
    data=>{
      console.log(data);
      notify("Area deleted successfully", "success", 1500);
      this.listAr();
    },
    err=>{
      notify(err.error.message, "warning", 1500);
      this.listAr();
      console.log(err.error.message)
    }

  )
}


updateSpace(event){

  this.adminService.updateSpace(event.data.idSpace,event.data).subscribe(
    data=>{console.log(data);
      notify("Space Updated successfully", "success", 1500);
      this.listSp();},
      err=>{
      notify(err.error.message, "warning", 1500);
      this.listSp();
      console.log(err.error.message)
    }
  )
  console.log(event)
}




  listSp()
  {
    this.adminService.listSpaces().subscribe(
      data=> {
        this.dataSource=data;
        console.log(data);
      },
      err=>{
        console.log(err);
          }
    )
  }


  addSpace(event){
    this.adminService.addSpace(event.data).subscribe(
      data=>{
        console.log(data);
        notify("Sapce added successfully", "success", 1500);
        this.listSp();
      },
      err=>{
        notify(err.error.message, "warning", 1500);
        this.listSp();
        console.log(err.error.message)
      }

    )
    }



DeleteSpace(event)
{
  this.adminService.deleteSpace(event.data.idSpace).subscribe(
    data=>{
      console.log(data);
      notify("Space deleted successfully", "success", 1500);
      this.listSp();
    },
    err=>{
      notify(err.error.message, "warning", 1500);
      this.listAr();
      console.log(err.error.message)
    }

  )
}





exportGrid1() {
  const doc = new jsPDF();
  exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
  }).then(() => {
      doc.save('spaces.pdf');
  })
}

exportGrid2() {
  const doc = new jsPDF();
  exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.aa.instance
  }).then(() => {
      doc.save('areas.pdf');
  })
}

onExporting1(e) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('spaces');

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


      }

    }
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "spaces.xlsx");
    });
  });
  e.cancel = true;
}





onExporting2(e) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('areas');

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


      }

    }
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "areas.xlsx");
    });
  });
  e.cancel = true;
}

}
