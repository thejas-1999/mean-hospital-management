import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  getDoctorsApi = 'http://localhost:5000/api/doctors/getDoctors'
  adddDoctorsApi = 'http://localhost:5000/api/doctors/addDoctor'
  updateDoctorsApi = 'http://localhost:5000/api/doctors/updateDoctor'
  deleteDoctorsApi = 'http://localhost:5000/api/doctors/deleteDoctor'

  constructor(private http: HttpClient) {
    this.fetchDoctors()
  }

  fetchDoctors() {
    return this.http.get<any[]>(this.getDoctorsApi)
  }
}
