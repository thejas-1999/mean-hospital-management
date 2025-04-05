import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorsService } from '../../doctors.service';

@Component({
  selector: 'app-doctors',
  standalone: false,
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {

  doctors: any[] = []

  constructor(private doctorService: DoctorsService) {
    this.getDoctorDetails()

  }

  doctorForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    specialization: new FormControl("", [Validators.required]) // Added specialization field
  });

  formSubmit() {
    if (this.doctorForm.valid) {
      console.log(this.doctorForm.value)
    }
  }

  getDoctorDetails() {
    this.doctorService.fetchDoctors().subscribe((result) => {
      this.doctors = result
    })
  }

}
