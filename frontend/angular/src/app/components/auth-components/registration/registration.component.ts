import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/shared/interfaces/address';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: RegistrationComponent }],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  hide = true;
  roles = ['manager', 'employee'];
  role: string | undefined;
  roleError = false;
  displayName: string | undefined;
  step = 0;
  userAddress: Address | undefined;
  isLogin: boolean | undefined;
  title: string = 'Register';

  registerForm = this.fb.group({
    tel: [
      '',
      [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{7}'),
        Validators.maxLength(11),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    role: [null, [Validators.required]],
    userId: ['', [Validators.required]],
  });

  addressForm = this.fb.group({
    city: ['', [Validators.required, Validators.pattern('^[a-z|A-Z]*$')]],
    street: ['', [Validators.required, Validators.pattern('^[a-z|A-Z]*$')]],
    house: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });

  ngOnInit(): void {
    const url = this.router.url;
    if (url.endsWith('registration')) {
      this.isLogin = false;
      this.registerForm.get('role')?.disable();
    } else {
      this.registerForm.get('role')?.enable();
      this.title = 'add employee';
      this.isLogin = true;
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getErrorMessage(key: string) {
    if (this.registerForm.get(key)?.errors?.['required']) {
      return 'You must enter a value';
    }
    if (this.registerForm.get(key)?.errors?.['pattern']) {
      return 'The phone number must be in the format 050-1234567';
    }
    if (this.registerForm.get(key)?.errors?.['minLength']) {
      return 'Password must contain at least 6 characters';
    }
    if (this.registerForm.get(key)?.errors?.['maxLength']) {
      return 'Phone number need to be 10 digits and 1 dash only';
    }

    return null;
  }

  setUserAddress() {
    this.userAddress = {
      city: this.addressForm.get('city')?.value,
      street: this.addressForm.get('street')?.value,
      houseNumber: this.addressForm.get('house')?.value,
      zipCode: this.addressForm.get('zipCode')?.value,
    };

    this.nextStep();
  }

  add() {
    this.displayName = `${this.registerForm.value.fName} ${this.registerForm.value.lName}`;
    this.authService.SignUp(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.fName,
      this.registerForm.value.lName,
      this.registerForm.value.tel,
      this.registerForm.value.role,
      this.registerForm.value.userId,
      this.userAddress!,
      this.displayName
    );
    // this.router.navigate(['/']);
    // this.notificationService.showSnackBar(
    //   'The employee was added successfully',
    //   'success-snackbar'
    // );
  }
}
