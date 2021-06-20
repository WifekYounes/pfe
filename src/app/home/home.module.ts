import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbCarouselModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import{OwlModule}from'ngx-owl-carousel';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    OwlModule,
    NgbCarouselModule,
    NgbDropdownModule,MatSnackBarModule,MatSelectModule,MatSliderModule,MatSlideToggleModule,MatSidenavModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }


