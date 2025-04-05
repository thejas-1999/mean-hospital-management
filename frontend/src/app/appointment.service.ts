import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private getAppointmentApi = 'http://localhost:5000/api/appointments/getAppointments';
  private addAppointmentApi = 'http://localhost:5000/api/appointments/addAppointment';
  private updateAppointmentApi = 'http://localhost:5000/api/appointments/updateAppointment';
  private deleteAppointmentApi = 'http://localhost:5000/api/appointments/deleteAppointment';
  private patientApi = 'http://localhost:5000/api/patients/getPatients'; // update this to your actual endpoint
  private doctorApi = 'http://localhost:5000/api/doctors/getDoctors';

  constructor(private http: HttpClient) { }

  fetchPatients() {
    return this.http.get<any[]>(this.patientApi);
  }

  fetchDoctors() {
    return this.http.get<any[]>(this.doctorApi);
  }

  fetchAppointments() {
    return this.http.get<any[]>(this.getAppointmentApi);
  }

  addAppointment(appointment: any) {
    return this.http.post(this.addAppointmentApi, appointment);
  }

  editAppointment(id: string, updatedData: any) {
    return this.http.put(`${this.updateAppointmentApi}/${id}`, updatedData);
  }

  deleteAppointment(appointmentId: string) {
    return this.http.delete(`${this.deleteAppointmentApi}/${appointmentId}`);
  }
}
