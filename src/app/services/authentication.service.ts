import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthenticationService {

  userData: any

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router) { }

    registerWithEmailAndPassword(email: string, password: string) {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.userData = user
        this.router.navigate(['login'])
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('E-mail ja em uso')
        }
      })

    }

    getUserData() {
      return this.userData
    }

}
