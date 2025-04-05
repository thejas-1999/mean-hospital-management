import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  getDoctorsApi = 'http://localhost:5000/api/doctors/getDoctors'
  adddDoctorApi = 'http://localhost:5000/api/doctors/addDoctor'
  updateDoctorApi = 'http://localhost:5000/api/doctors/updateDoctor'
  deleteDoctorApi = 'http://localhost:5000/api/doctors/deleteDoctor'

  constructor(private http: HttpClient) {
    this.fetchDoctors()
  }

  fetchDoctors() {
    return this.http.get<any[]>(this.getDoctorsApi)
  }

  addDoctors(doctor: any) {
    return this.http.post(this.adddDoctorApi, doctor)

  }

  editDoctor(id: string, updatedData: any) {
    return this.http.put(`${this.updateDoctorApi}/${id}`, updatedData);
  }

  deleteDoctor(doctorId: string) {
    return this.http.delete(`${this.deleteDoctorApi}/${doctorId}`)
  }

}
