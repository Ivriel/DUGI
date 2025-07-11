import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenManualService {

  apiUrl:string=environment.apiBase.absenManualApi
  constructor(private http:HttpClient) { }
  
  addAbsenManual(absenManual:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,absenManual)
  }

}
