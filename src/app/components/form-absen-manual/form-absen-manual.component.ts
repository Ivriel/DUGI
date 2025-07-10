import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-form-absen-manual',
  imports: [],
  templateUrl: './form-absen-manual.component.html',
  styleUrl: './form-absen-manual.component.css'
})
export class FormAbsenManualComponent {
  constructor(private authService:AuthService, private router:Router,private title:Title){
    this.title.setTitle("Form Absen Manual")
  }



  logout(){
    const isLogout = confirm("Are you sure you wanna to logout?")
    if(isLogout) {
      this.authService.logout()
      this.router.navigateByUrl("login")
    }
  }
}
