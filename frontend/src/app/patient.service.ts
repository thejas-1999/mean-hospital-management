import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private getPatientsApi = 'http://localhost:5000/api/patients/getPatients';
  private addPatientApi = 'http://localhost:5000/api/patients/addPatient';
  private updatePatientApi = 'http://localhost:5000/api/patients/updatePatient';
  private deletePatientApi = 'http://localhost:5000/api/patients/deletePatient';

  constructor(private http: HttpClient) { }

  fetchPatients() {
    return this.http.get<any[]>(this.getPatientsApi);
  }

  addPatient(patient: any) {
    return this.http.post(this.addPatientApi, patient);
  }

  editPatient(id: string, updatedData: any) {
    return this.http.put(`${this.updatePatientApi}/${id}`, updatedData);
  }

  deletePatient(patientId: string) {
    return this.http.delete(`${this.deletePatientApi}/${patientId}`);
  }
}
