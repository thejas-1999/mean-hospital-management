import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../appointment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'] // fixed from styleUrl
})
export class AppointmentsComponent {
  appointments: any[] = [];
  patients: any[] = [];
  doctors: any[] = [];
  editMode: boolean = false;
  selectedAppointmentId: string | null = null;
  today: string = new Date().toISOString().split('T')[0];

  appointmentForm = new FormGroup({
    patient: new FormControl('', [Validators.required]),
    doctor: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  });

  constructor(private appointmentService: AppointmentService, private toastr: ToastrService) {
    this.getAppointmentDetails();
    this.loadPatientsAndDoctors();
  }

  getAppointmentDetails() {
    this.appointmentService.fetchAppointments().subscribe((result) => {
      this.appointments = result;
      console.log(this.appointments);
    });
  }

  loadPatientsAndDoctors() {
    this.appointmentService.fetchPatients().subscribe((res) => {
      this.patients = res;
    });

    this.appointmentService.fetchDoctors().subscribe((res) => {
      this.doctors = res;
    });
  }

  formSubmit() {
    if (this.appointmentForm.valid) {
      const formValue = this.appointmentForm.value;

      const appointmentPayload = {
        patientId: formValue.patient,
        doctorId: formValue.doctor,
        date: formValue.date,
      };

      if (this.editMode && this.selectedAppointmentId) {
        this.appointmentService
          .editAppointment(this.selectedAppointmentId, appointmentPayload)
          .subscribe(() => {
            this.toastr.success('Appointment updated successfully');

            this.getAppointmentDetails();
            this.resetForm();
          });
      } else {
        this.appointmentService
          .addAppointment(appointmentPayload)
          .subscribe(() => {
            this.toastr.success('Appointment added successfully');

            this.getAppointmentDetails();
            this.resetForm();
          });
      }
    }
  }


  editAppointment(appointment: any) {
    this.editMode = true;
    this.selectedAppointmentId = appointment._id;
    this.appointmentForm.patchValue({
      patient: appointment.patient._id,
      doctor: appointment.doctor._id,
      date: appointment.date
    });
  }

  deleteAppointment(appointmentId: string) {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(() => {
      this.toastr.info('Appointment deleted');

      this.getAppointmentDetails();
    });
  }

  resetForm() {
    this.appointmentForm.reset();
    this.editMode = false;
    this.selectedAppointmentId = null;
  }
}
