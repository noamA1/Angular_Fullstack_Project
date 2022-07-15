import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Address } from '../interfaces/address';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_URL = 'http://localhost:5000/api/users';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient
  ) {}

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        // this.ngZone.run(() => {
        //   // this.profileService.setUserRole(result.user?.uid);
        //   localStorage.setItem('user', JSON.stringify(result.user));
        //   JSON.parse(localStorage.getItem('user')!);
        //   // this.router.navigate(['/']);
        // });
        this.SetUserData(result.user);
        return result;
      })
      .catch((error) => {
        const errorCode = error.code;
        // if (
        //   errorCode === 'auth/invalid-email' ||
        //   errorCode === 'auth/wrong-password' ||
        //   errorCode === 'auth/user-not-found'
        // ) {
        //   this.notificationService.showSnackBar(
        //     'Wrong email address or password.',
        //     'danger-snackbar'
        //   );
        // } else {
        //   this.notificationService.showSnackBar(
        //     'Unexpected Error',
        //     'danger-snackbar'
        //   );
        // }
      });
  }

  SignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    role: string,
    userID: string,
    address: Address,
    displayName: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.updateProfile({
          displayName: displayName,
        });
        this.SetUserDataByEmailAndPassword(
          result.user,
          firstName,
          lastName,
          phone,
          role,
          userID,
          address
        ).subscribe((res) => {
          console.log(res);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        // if (
        //   errorCode === 'auth/invalid-email' ||
        //   errorCode === 'auth/wrong-password' ||
        //   errorCode === 'auth/user-not-found'
        // ) {
        //   this.notificationService.showSnackBar(
        //     'Wrong email address or password.',
        //     'danger-snackbar'
        //   );
        // } else {
        //   this.notificationService.showSnackBar(
        //     'Unexpected Error',
        //     'danger-snackbar'
        //   );
        // }
      });
  }

  SetUserDataByEmailAndPassword(
    user: any,
    first: string,
    last: string,
    phone: string,
    role: string,
    userID: string,
    address: any
  ): Observable<User> {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users/${user.uid}`
    // );

    const userData: User = {
      _id: user.uid,
      userId: userID,
      email: user.email,
      firstName: first,
      lastName: last,
      phone: phone,
      role,
      address,
    };
    return this.http.post<User>(`${this.USER_URL}`, userData);
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    let role = localStorage.getItem('userRole');
    if (role !== null) {
      return {
        user: user,
        role: role,
      };
    }
    return;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    userRef.update({
      uid: user.uid,
      email: user.email,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      this.router.navigate(['/authentication/log-in']);
    });
  }
}
