import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class formPengajuanCutiService {
  constructor(private http: HttpClient) {}

  getEmployee() {
    return this.http.get<any>(environment.apiBase.employeeApi);
  }

  getJenisCuti() {
    return this.http.get<any[]>(`${environment.apiBase.pengajuanCutiApi}/JenisCuti`);
  }

  ajukanCuti(body: any) {
  const isFormData = body instanceof FormData;
  return this.http.post(environment.apiBase.pengajuanCutiApi, body, {
    responseType: 'text' as 'json',
    ...(isFormData ? {} : { headers: { 'Content-Type': 'application/json' } })
  });
}

}
