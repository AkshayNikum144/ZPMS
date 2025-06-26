import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EducationComponent } from './education/education.component';
import { WCDComponent } from './wcd/wcd.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SchoolInfoFormComponent } from './school-info-form/school-info-form.component';
import { SchoolVisitFormComponent } from './school-visit-form/school-visit-form.component';
import { AnganwadiFormComponent } from './anganwadi-form/anganwadi-form.component';
import { InspectionReportComponent } from './inspection-report/inspection-report.component';


import { SchoolReportComponent } from './school-report/school-report.component';
import { SchoolObjectiveComponent } from './school-objective/school-objective.component';
import { AganwadiReportComponent } from './aganwadi-report/aganwadi-report.component';
import { HospitalFormComponent } from './hospital-form/hospital-form.component';

import { ArogyaFormComponent } from './arogya-form/arogya-form.component';
import { ArogyaChecklistFormComponent } from './arogya-checklist-form/arogya-checklist-form.component';
import { ArogyaReportComponent } from './arogya-report/arogya-report.component';
import { ReportArogyaComponent } from './report-arogya/report-arogya.component';
import { SchoolVisitReportComponent } from './school-visit-report/school-visit-report.component';
import { ViewInspectionComponent } from './view-inspection/view-inspection.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // redirect root path to /register
  { path: 'register', component: RegisterComponent },
  {path:'login',component:LoginComponent },
  {path:'dashboard',component:DashboardComponent}, // Assuming you have a DashboardComponent
  {path:'education', component: EducationComponent},
  {path:'wcd',component:WCDComponent}, 
  {path:'hospital-form',component:HospitalFormComponent},
  {path:'school-info-form',component:SchoolInfoFormComponent}, 
    {path:'school-visit-form',component:SchoolVisitFormComponent}, 
    {path:'school-visit-app',component:SchoolVisitFormComponent},
    {path:'anganwadi-form',component:AnganwadiFormComponent}, 
    {path:'view-inspection/:idssss',component:ViewInspectionComponent}, 
    {path:'inspection-report',component:InspectionReportComponent}, 
     {path:'inspection-report/:id',component:InspectionReportComponent}, 
    { path: 'anganwadi-form/:id', component: AnganwadiFormComponent },
     { path: 'aganwadi-report', component: AganwadiReportComponent},
     {path:'arogya-checklist-form',component:ArogyaChecklistFormComponent},
     {path:'arogya-report',component:ArogyaReportComponent},
      {path:'report-arogya/:id',component:ReportArogyaComponent},

    
    {path:'arogya-form',component:ArogyaFormComponent},
    { path: 'arogya-form/:id', component: ArogyaFormComponent },
    {path:'school-report',component:SchoolReportComponent},
    {path:'school-objective',component:SchoolObjectiveComponent},
    {path:'school-visit-report/:id',component:SchoolVisitReportComponent},
     {path:'school-visit-report',component:SchoolVisitReportComponent},
     {
    path: 'school-visit-form/:id', // This route matches your navigation call
    component: SchoolVisitFormComponent // This component will be loaded
  },

  // Example for Education department
  { path: '**', redirectTo: 'login' }  // wildcard fallback
];
