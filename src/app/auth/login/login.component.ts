import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        const result = res.data.login;
  
        if (result === 'Login successful') {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/employees']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please check your credentials'
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: 'Invalid email or password'
        });
      }
    });
  }
}
