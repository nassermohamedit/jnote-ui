import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;


  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form submitted');
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.getRawValue()).subscribe(
        (isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigateByUrl('/');
          } else {
            console.log('Oops! Login failed');
          }
        }
      )
    }
  }
}
