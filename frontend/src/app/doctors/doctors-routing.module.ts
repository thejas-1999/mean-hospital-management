import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'doctors',
    pathMatch: 'full'
  },
  {
    path: 'doctors',
    component: DoctorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
