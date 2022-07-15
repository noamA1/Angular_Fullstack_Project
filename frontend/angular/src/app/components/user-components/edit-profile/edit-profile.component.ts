import { Address } from 'src/app/shared/interfaces/address';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../shared/models/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userInfo: User | undefined;
  userAddress: Address | undefined;
  editMode = true;
  constructor(
    private fb: FormBuilder,
    private userSer: UserService,
    private router: Router
  ) {}

  docId: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  userEmail: string = '';
  // userId: string = '';
  id: string = '';
  userCity: string = '';
  userStreet: string = '';
  userHouse: string = '';
  userZipCode: string = '';

  userForm = this.fb.group({
    tel: [
      '',
      [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{7}'),
        Validators.maxLength(11),
      ],
    ],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    email: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    house: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
  });

  ngOnInit(): void {
    try {
      this.docId = window.history.state.user._id;
      this.firstName = window.history.state.user.firstName;
      this.lastName = window.history.state.user.lastName;
      this.phone = window.history.state.user.phoneNumber;
      this.userEmail = window.history.state.user.email;
      this.id = window.history.state.user.userId;
      this.userCity = window.history.state.user.address.city;
      this.userStreet = window.history.state.user.address.street;
      this.userHouse = window.history.state.user.address.houseNumber;
      this.userZipCode = window.history.state.user.address.zipCode;
    } catch (error) {
      this.router.navigate(['/profile']);
    }
  }

  getErrorMessage(key: string) {
    if (this.userForm.get(key)?.errors?.['required']) {
      return 'You must enter a value';
    }
    if (this.userForm.get(key)?.errors?.['pattern']) {
      return 'The phone number must be in the format 050-1234567';
    }
    if (this.userForm.get(key)?.errors?.['maxLength']) {
      return 'Phone number need to be 10 digits and 1 dash only';
    }
    return;
  }

  update() {
    this.userAddress = {
      city: this.userForm.value.city,
      street: this.userForm.value.street,
      house: this.userForm.value.house,
      zipCode: this.userForm.value.zipCode,
    };

    this.userInfo = {
      userId: this.userForm.value.userId,
      firstName: this.userForm.value.fName,
      lastName: this.userForm.value.lName,
      phone: this.userForm.value.tel,
      email: this.userForm.value.email,
      address: this.userAddress,
    };
    console.log(this.userInfo);
    this.userSer.updateUser(this.userInfo, this.docId).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/profile']);
  }
}
