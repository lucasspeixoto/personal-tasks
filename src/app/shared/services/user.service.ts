import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { User } from '../static/user';

import { MessageService } from 'primeng/api';
import { Summary, Detail } from '../static/messages';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private angularFireDatabase: AngularFireDatabase,
  ) { }

  writeUserData(id: string, name: string, email: string, password?: string) {
    firebase.database().ref('users/' + id).set({
      username: name,
      email: email,
      password : password
    });
  }

  getUserData(id: string) {
    return this.angularFireDatabase.list(`/users/${id}`);
  }

}
