import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {

  constructor(
    private angularFireDatabase: AngularFireDatabase,
  ) { }

  // Leitura dos dados fixo
  getDropListInfos() {
    return this.angularFireDatabase.list(`/parameters`).valueChanges()
  }

}
