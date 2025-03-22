import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [CommonModule, FormsModule]
})

export class SignupComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup(this.username, this.email, this.password).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful!',
          text: `Welcome, ${res.data.signup.username}`,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: 'Email might already be in use'
        });
      }
    });
  }
}
