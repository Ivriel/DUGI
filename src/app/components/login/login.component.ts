import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private title: Title,private router:Router) {
    this.title.setTitle('Login');
  }

  onLoginSubmit(form: NgForm) {
    console.log('Form Value: ', form.value);
    console.log('Login Obj: ', this.loginObj);
    console.log('Data yang akan dikirim ke API:', this.loginObj);
    this.authService.sendDataLogin(this.loginObj).subscribe({
      next: (res: any) => {
        alert('Login berhasil');
        console.log('Login berhasil: ', res);
        if (res.accessToken) {
          this.authService.setToken(res.accessToken);
          this.router.navigateByUrl("login")
        }
      },
      error: (error) => {
        console.error('Login gagal: ', error);
        alert('Login gagal');
      },
    });
  }
}
