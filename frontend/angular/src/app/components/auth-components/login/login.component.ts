import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter your email address';
    }
    if (this.emailFormControl.hasError('email')) {
      return 'Enter a vaild email address';
    }
    if (this.passwordFormControl.hasError('required')) {
      return 'You must enter your email address';
    }
    if (this.passwordFormControl.hasError('minLength')) {
      return 'Password must contain at least 6 characters';
    }
    return;
  }

  signIn() {
    this.authService.SignIn(
      this.emailFormControl.value,
      this.passwordFormControl.value
    );
  }
}
