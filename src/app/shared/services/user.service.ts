import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

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
    return this.angularFireDatabase.list(`/users/${id}`)
  }

}
