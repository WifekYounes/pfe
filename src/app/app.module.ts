import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {DatePipe} from '@angular/common';

import { DxAutocompleteModule, DxCheckBoxModule, DxDrawerComponent, DxDrawerModule, DxListModule, DxNumberBoxModule, DxRadioGroupModule, DxToolbarModule, DxValidationSummaryModule } from 'devextreme-angular';


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DxDataGridModule } from 'devextreme-angular';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
 } from 'devextreme-angular';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DxFileUploaderModule } from "devextreme-angular";
import { LayoutModule } from '@angular/cdk/layout';
import { DxTextBoxModule, DxValidatorModule, DxButtonModule } from "devextreme-angular";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxDropDownButtonModule } from 'devextreme-angular';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { Service } from './services/app.service';

import { DxSliderModule, DxPopupModule, DxTemplateModule  } from "devextreme-angular";
import { MapModule } from './dashboard/map/map.module';

import { RapportModule } from './dashboard/rapport/rapport.module';
import { EmployeesModule } from './dashboard/employees/employees.module';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { authInterceptorProviders } from './JWT-header-HTTP/auth.interceptor';

import { SubuserdashboardComponent } from './subuserdashboard/subuserdashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,AdmindashboardComponent,
    LoginComponent,
    NavBarComponent,
    FooterComponent,

    SubuserdashboardComponent

  ],
//https://mdbootstrap.com/docs/angular/navigation/footer/
  imports: [
    DxCheckBoxModule,

    DxNumberBoxModule,
    DxButtonModule,
    DxAutocompleteModule,
    DxFormModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule,DxDataGridModule,
    BrowserAnimationsModule,DxSliderModule, DxTextBoxModule, DxValidatorModule, DxButtonModule,
    BrowserAnimationsModule,MatButtonModule, A11yModule,
    ClipboardModule,DxFileUploaderModule,DxDropDownButtonModule,
    CdkStepperModule,
    CdkTableModule, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule,
    CdkTreeModule,RouterModule,
    DragDropModule, DxPopupModule, DxTemplateModule,
    MatAutocompleteModule,DxSelectBoxModule,
    DxTextAreaModule,
    DxFormModule,

    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    LayoutModule,
    NgbModule,
    MapModule,

    RapportModule,
    EmployeesModule,
    HomeModule,
    DxValidatorModule,
    DxValidationSummaryModule
  ],
  providers: [authInterceptorProviders,DatePipe],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule {

 }
