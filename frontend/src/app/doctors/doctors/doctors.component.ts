import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorsService } from '../../doctors.service';
import { Doctor } from '../../doctor';

@Component({
  selector: 'app-doctors',
  standalone: false,
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {

  doctors: Doctor[] = []
  editMode: boolean = false
  selectedDoctorId: string | null = null;


  constructor(private doctorService: DoctorsService) {
    this.getDoctorDetails()

  }

  doctorForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    specialization: new FormControl("", [Validators.required])
  });

  formSubmit() {
    if (this.doctorForm.valid) {
      const doctor = this.doctorForm.value;

      if (this.editMode && this.selectedDoctorId) {
        this.doctorService.editDoctor(this.selectedDoctorId, doctor).subscribe((result) => {
          console.log('Doctor updated successfully');

          this.getDoctorDetails();


          this.doctorForm.reset();
          this.editMode = false;
          this.selectedDoctorId = null;
        });
      } else {
        this.doctorService.addDoctors(doctor).subscribe((result) => {
          console.log('Doctor inserted successfully');
          this.getDoctorDetails();
          this.doctorForm.reset();
        });
      }
    }
  }


  getDoctorDetails() {
    this.doctorService.fetchDoctors().subscribe((result) => {
      this.doctors = result

    })
  }

  editDoctor(doctor: any) {
    this.editMode = true;
    this.selectedDoctorId = doctor._id;
    this.doctorForm.patchValue({
      name: doctor.name,
      specialization: doctor.specialization,
    });
  }

  deleteDoctor(doctorId: any) {
    this.doctorService.deleteDoctor(doctorId).subscribe((result) => {
      console.log(`Deleted Successfully`)
      this.getDoctorDetails()
    })

  }
}
