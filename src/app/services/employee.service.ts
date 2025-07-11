import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl: string = environment.apiBase.employeeApi;

  constructor(private http: HttpClient) { }

  getEmployeeData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
} 