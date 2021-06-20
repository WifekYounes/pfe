import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RapportComponent } from './rapport.component';

const routes: Routes = [{ path: '', component: RapportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportRoutingModule { }
