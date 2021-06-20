import { Component, OnInit, ViewChild } from '@angular/core';
import { TestServiceService } from '../services/test-service.service';
import notify from 'devextreme/ui/notify';
import { DxFormComponent } from 'devextreme-angular';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent
email:String;


  constructor(private t:TestServiceService) { }

  ngOnInit(): void {
  }


save(){

 // alert(this.form.instance.option("formData").email)

this.t.resetPassword(this.form.instance.option("formData").email).subscribe(
  data =>{

    notify("Password send successfully ! Check your email ", "success", 1500);
  },
  err=>{console.log(err.error.message)

    notify("Error in email ! Please verify it", "warning", 1500);}
)

console.log(this.email)



}
}
