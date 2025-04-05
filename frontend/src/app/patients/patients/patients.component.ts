import { Component } from '@angular/core';
import { PatientService } from '../../patient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patients',
  standalone: false,
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent {
  patients: any[] = [];
  editMode: boolean = false;
  selectedPatientId: string | null = null;

  patientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    age: new FormControl(null, [Validators.required, Validators.min(0)]),
    gender: new FormControl('', [Validators.required])
  });

  constructor(private patientService: PatientService) {
    this.getPatientDetails();
  }

  getPatientDetails() {
    this.patientService.fetchPatients().subscribe((result) => {
      this.patients = result;
    });
  }

  formSubmit() {
    if (this.patientForm.valid) {
      const patient = this.patientForm.value;
      console.log('Submitting:', patient);

      if (this.editMode && this.selectedPatientId) {
        this.patientService.editPatient(this.selectedPatientId, patient).subscribe(() => {
          console.log('Patient updated successfully');
          this.getPatientDetails();
          this.resetForm();
        });
      } else {
        this.patientService.addPatient(patient).subscribe(() => {
          console.log('Patient inserted successfully');
          this.getPatientDetails();
          this.resetForm();
        });
      }
    }
  }

  editPatient(patient: any) {
    this.editMode = true;
    this.selectedPatientId = patient._id;
    this.patientForm.patchValue({
      name: patient.name,
      age: patient.age,
      gender: patient.gender
    });
  }

  deletePatient(patientId: string) {
    this.patientService.deletePatient(patientId).subscribe(() => {
      console.log('Deleted successfully');
      this.getPatientDetails();
    });
  }



  resetForm() {
    this.patientForm.reset();
    this.editMode = false;
    this.selectedPatientId = null;
  }
}
