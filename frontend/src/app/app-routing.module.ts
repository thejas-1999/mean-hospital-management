import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full'
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {
    path: 'doctors',
    loadChildren: () => import('./doctors/doctors.module').then(m => m.DoctorsModule)
  },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
