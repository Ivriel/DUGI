import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AbsenManualService {

  apiUrl:string=environment.apiBase.absenManualApi
  constructor(private http:HttpClient) { }

}
