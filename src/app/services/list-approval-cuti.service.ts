import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CutiService {
  private apiUrl = environment.apiBase.cutiRiwayatApi;

  constructor(private http: HttpClient) {}

  getRiwayatCuti(body: {
    keyword: string;
    start: string;
    end: string;
    companyId: number;
    employeeId: number;
    status: string;
    pageSize: number;
    pageNumber: number;
  }) {
    return this.http.post<any>(this.apiUrl, body);
  }
}
