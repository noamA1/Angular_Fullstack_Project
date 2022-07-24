import {
  Component,
  OnInit,
  VERSION,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormControl,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RecaptchaComponent, RecaptchaErrorParameters } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  version = VERSION.full;
  lang = 'en';
  FormGroup: FormGroup | any;
  @ViewChild('captchaElem') captchaElem: RecaptchaComponent | any;
  @ViewChild('langInput') langInput: ElementRef | any;
  recComp: RecaptchaComponent | any;
  token: string | undefined;
  // siteKey = environment.recaptcha.siteKey;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.token = undefined;
  }

  ngOnInit(): void {
    this.FormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
    });
  }

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

  public getToken(captchaResponse: string): void {
    console.log(`Resolved captcha with response:`, captchaResponse);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`Recaptcha error encountered; details:`, errorDetails);
  }

  // send(form: NgForm): void {
  //   if (form.invalid) {
  //     for (const control of Object.keys(form.controls)) {
  //       form.controls[control].markAsTouched();
  //     }
  //     return;
  //   }

  //   console.debug(`Token [${this.token}] generated`);
  // }

  signIn() {
    this.authService.SignIn(
      this.emailFormControl.value,
      this.passwordFormControl.value
    );
  }
}
