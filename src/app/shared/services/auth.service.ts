import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Summary, Detail } from '../static/messages';
import { UserService } from './user.service';
import { ProviderUser } from './../static/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  providerUserData: ProviderUser

  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private messageService: MessageService,
    private userService: UserService,
  ) {
    //Salvar as informações do usuário no localStorage
    this.angularFireAuth.authState.subscribe(
      (user: ProviderUser) => {
        if (user) {
          this.providerUserData = user;
          localStorage.setItem('user', JSON.stringify(this.providerUserData))
          JSON.parse(localStorage.getItem('user'))
        } else {
          localStorage.setItem('user', null)
          JSON.parse(localStorage.getItem('user'))
        }
      });
  }

  // Logar com e-mail e senha
  SignIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['tasks'])
        });
        this.SetUserData(result.user)
      })
      .catch((error) => {
        this.messageService.clear()
        this.messageService.add({
          severity: 'error',
          summary: Summary[error.code],
          detail: Detail[error.code],
        })
      })
  }

  // Registrar com e-mail e senha
  SignUp(email: string, password: string, name: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Enviar e-mail de confirmação do cadastro
        this.SendVerificationMail()
        this.SetUserData(result.user)
        this.userService.writeUserData(result.user.uid, name, email, password)

      })
      .catch((error) => {
        this.messageService.clear()
        this.messageService.add({
          severity: 'error',
          summary: Summary[error.code],
          detail: Detail[error.code],
        });
      });
  }

  // Envio do e-mail de confirmação quando usuário se cadastra
  async SendVerificationMail() {
    return await (await this.angularFireAuth.currentUser)
      .sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email'])
      });
  }

  // Alterar senha
  ForgotPassword(passwordResetEmail: string) {
    return this.angularFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.messageService.clear()
        this.messageService.add({
          severity: 'info',
          summary: 'E-mail enviado',
          detail: 'O link para alteração foi enviado por e-mail, verificar caixa',
        });
      })
      .catch((error) => {
        this.messageService.clear()
        this.messageService.add({
          severity: 'error',
          summary: Summary[error.code],
          detail: Detail[error.code],
        });
      });
  }

  // Retornar true quando usuário logado e verificado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    return user !== null && user.emailVerified !== false ? true : false
  }

  // Logar Com Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider())
  }

  // Logar com Facebook
  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider())
  }

  // Função para logar com autenticação (Google, Facebook, etc...)
  AuthLogin(provider) {
    return this.angularFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['tasks'])
        });
        this.SetUserData(result.user)
      })
      .catch((error) => {
        this.messageService.clear()
        this.messageService.add({
          severity: 'error',
          summary: Summary[error.code],
          detail: Detail[error.code],
        });
      });
  }
  /* Função para setar as informações do usuário quando logar (email e senha
    ou com provider com Google/Facebook) */
  SetUserData(user: ProviderUser) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${user.uid}`)
    const userData: ProviderUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, { merge: true })
  }

  // Deslogar
  SignOut() {
    return this.angularFireAuth.signOut()
      .then(() => {
        localStorage.removeItem('user')
        this.router.navigate(['login'])
      })
  }
}
