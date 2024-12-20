import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Chart1Component } from './chart1/chart1.component';
import { Chart2Component } from './chart2/chart2.component';

import { Chart3Component } from './chart3/chart3.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';





const routes: Routes = [

  // {path: '/app', component: DashboardComponent},

  




  {
    path: 'bar',
    pathMatch: 'full',
    component: Chart1Component
  },

  {
    path: 'doughnut',
    pathMatch: 'full',
    component:Chart2Component
  },
  {
    path: 'line',
    pathMatch: 'full',
    component:Chart3Component
  },
 {
   path: '**',
   pathMatch: 'full',
   component: DashboardComponent
 },
 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
