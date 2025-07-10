import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-form-pengajuan-cuti',
  imports: [],
  templateUrl: './form-pengajuan-cuti.component.html',
  styleUrl: './form-pengajuan-cuti.component.css'
})
export class FormPengajuanCutiComponent {

  constructor(private authService:AuthService,private router:Router, private title:Title){
    this.title.setTitle("Form Pengajuan Cuti")
  }

  logout(){
    const isLogout = confirm("Are you sure you wanna to logout")
    if(isLogout) {
      this.authService.logout()
      this.router.navigateByUrl("login")
    }
  }
}
