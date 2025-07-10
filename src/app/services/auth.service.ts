import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string = environment.apiBase.loginApi
  constructor(private http:HttpClient) { }

  sendDataLogin(loginData:{email:string;password:string;}){
    console.log("Data yang dikirim ke API: ",loginData)
    console.log("Alamat API LOGIN: ",this.apiUrl)
    return this.http.post(this.apiUrl,loginData)
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }

  logout(){
    localStorage.removeItem('token')
  }
}
